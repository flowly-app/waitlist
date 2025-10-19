#!/bin/bash

# Git Workflow Helper Script for Flowly Waitlist
# Usage: ./scripts/git-workflow.sh <command> [options]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_help() {
    echo -e "${BLUE}Git Workflow Helper for Flowly Waitlist${NC}"
    echo ""
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  start <feature-name>    Create a new feature branch from develop"
    echo "  finish                 Complete current feature and create PR"
    echo "  rebase                 Rebase current feature onto develop"
    echo "  rebase-interactive     Interactive rebase for commit cleanup"
    echo "  squash                 Squash all commits into one"
    echo "  trigger-rebase <pr#>   Trigger rebase workflow for PR"
    echo "  cleanup                Clean up merged feature branches"
    echo "  sync                   Sync with develop branch"
    echo "  status                 Show current git status"
    echo "  help                   Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start add-login"
    echo "  $0 rebase"
    echo "  $0 finish"
    echo "  $0 trigger-rebase 123"
    echo "  $0 cleanup"
}

start_feature() {
    local feature_name=$1
    if [ -z "$feature_name" ]; then
        echo -e "${RED}Error: Feature name is required${NC}"
        echo "Usage: $0 start <feature-name>"
        exit 1
    fi
    
    echo -e "${YELLOW}Starting new feature: $feature_name${NC}"
    
    # Ensure we're on develop
    git checkout develop
    git pull origin develop 2>/dev/null || echo "No remote origin set yet"
    
    # Create feature branch
    git checkout -b "feature/$feature_name"
    
    echo -e "${GREEN}✓ Created feature branch: feature/$feature_name${NC}"
    echo -e "${BLUE}You can now start working on your feature${NC}"
}

finish_feature() {
    local current_branch=$(git branch --show-current)
    
    if [[ ! $current_branch =~ ^feature/ ]]; then
        echo -e "${RED}Error: You must be on a feature branch to finish${NC}"
        echo "Current branch: $current_branch"
        exit 1
    fi
    
    echo -e "${YELLOW}Finishing feature: $current_branch${NC}"
    
    # Check if there are uncommitted changes
    if ! git diff --quiet || ! git diff --cached --quiet; then
        echo -e "${YELLOW}You have uncommitted changes. Please commit them first.${NC}"
        git status
        exit 1
    fi
    
    # Push the branch
    git push origin "$current_branch" 2>/dev/null || echo "No remote origin set yet"
    
    echo -e "${GREEN}✓ Feature branch pushed: $current_branch${NC}"
    echo -e "${BLUE}Next steps:${NC}"
    echo "1. Create a Pull Request to merge into develop"
    echo "2. Use: gh pr create --title \"Your PR Title\" --body \"Description\""
}

sync_with_develop() {
    echo -e "${YELLOW}Syncing with develop branch${NC}"
    
    # Switch to develop and pull latest
    git checkout develop
    git pull origin develop 2>/dev/null || echo "No remote origin set yet"
    
    echo -e "${GREEN}✓ Synced with develop${NC}"
}

rebase_feature() {
    local current_branch=$(git branch --show-current)
    
    if [[ ! $current_branch =~ ^feature/ ]]; then
        echo -e "${RED}Error: You must be on a feature branch to rebase${NC}"
        echo "Current branch: $current_branch"
        exit 1
    fi
    
    echo -e "${YELLOW}Rebasing feature branch: $current_branch${NC}"
    
    # Check for uncommitted changes
    if ! git diff --quiet || ! git diff --cached --quiet; then
        echo -e "${YELLOW}You have uncommitted changes. Please commit them first.${NC}"
        git status
        exit 1
    fi
    
    # Fetch latest changes
    git fetch origin develop
    
    # Rebase onto develop
    echo -e "${BLUE}Rebasing onto develop...${NC}"
    if git rebase origin/develop; then
        echo -e "${GREEN}✓ Rebase completed successfully${NC}"
        
        # Force push if needed
        if git status | grep -q "Your branch is ahead"; then
            echo -e "${YELLOW}Force pushing rebased branch...${NC}"
            git push origin "$current_branch" --force-with-lease
            echo -e "${GREEN}✓ Force pushed rebased branch${NC}"
        fi
    else
        echo -e "${RED}❌ Rebase failed. Please resolve conflicts and run:${NC}"
        echo "  git rebase --continue"
        echo "  or"
        echo "  git rebase --abort"
        exit 1
    fi
}

interactive_rebase() {
    local current_branch=$(git branch --show-current)
    
    if [[ ! $current_branch =~ ^feature/ ]]; then
        echo -e "${RED}Error: You must be on a feature branch for interactive rebase${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}Starting interactive rebase for: $current_branch${NC}"
    
    # Get the base commit (where feature branch started)
    local base_commit=$(git merge-base origin/develop HEAD)
    local commit_count=$(git rev-list --count $base_commit..HEAD)
    
    if [ $commit_count -eq 0 ]; then
        echo -e "${BLUE}No commits to rebase${NC}"
        return
    fi
    
    echo -e "${BLUE}Found $commit_count commits to rebase${NC}"
    echo -e "${YELLOW}Starting interactive rebase...${NC}"
    
    git rebase -i $base_commit
}

squash_commits() {
    local current_branch=$(git branch --show-current)
    
    if [[ ! $current_branch =~ ^feature/ ]]; then
        echo -e "${RED}Error: You must be on a feature branch to squash${NC}"
        exit 1
    fi
    
    # Get the base commit
    local base_commit=$(git merge-base origin/develop HEAD)
    local commit_count=$(git rev-list --count $base_commit..HEAD)
    
    if [ $commit_count -le 1 ]; then
        echo -e "${BLUE}Only one commit, nothing to squash${NC}"
        return
    fi
    
    echo -e "${YELLOW}Squashing $commit_count commits into one${NC}"
    echo -e "${BLUE}Starting interactive rebase...${NC}"
    
    git rebase -i $base_commit
}

trigger_rebase() {
    local pr_number=$1
    if [ -z "$pr_number" ]; then
        echo -e "${RED}Error: PR number is required${NC}"
        echo "Usage: $0 trigger-rebase <pr-number>"
        exit 1
    fi
    
    echo -e "${YELLOW}Triggering rebase for PR #$pr_number${NC}"
    
    # Check if gh CLI is available
    if ! command -v gh &> /dev/null; then
        echo -e "${RED}Error: GitHub CLI (gh) is not installed${NC}"
        echo "Please install it from: https://cli.github.com/"
        exit 1
    fi
    
    # Trigger the auto-rebase workflow
    gh workflow run auto-rebase.yml \
        --field pr_number="$pr_number" \
        --field force_rebase="true"
    
    echo -e "${GREEN}✓ Rebase workflow triggered${NC}"
    echo -e "${BLUE}Check the Actions tab to see the progress${NC}"
}

cleanup_merged_branches() {
    echo -e "${YELLOW}Cleaning up merged feature branches...${NC}"
    
    # Switch to develop and pull latest
    git checkout develop
    git pull origin develop
    
    # Find and delete merged feature branches
    MERGED_BRANCHES=$(git branch --merged | grep -E '^[[:space:]]*feature/' | sed 's/^[[:space:]]*//')
    
    if [ -z "$MERGED_BRANCHES" ]; then
        echo -e "${BLUE}No merged feature branches found${NC}"
        return
    fi
    
    echo -e "${BLUE}Found merged feature branches:${NC}"
    echo "$MERGED_BRANCHES"
    
    # Delete local branches
    echo "$MERGED_BRANCHES" | xargs -r git branch -d
    
    # Delete remote branches
    echo "$MERGED_BRANCHES" | while read branch; do
        if git show-ref --verify --quiet "refs/remotes/origin/$branch"; then
            git push origin --delete "$branch"
            echo -e "${GREEN}✓ Deleted remote branch: $branch${NC}"
        fi
    done
    
    echo -e "${GREEN}✓ Cleanup completed${NC}"
}

show_status() {
    echo -e "${BLUE}Current Git Status:${NC}"
    git status
    echo ""
    echo -e "${BLUE}Current Branch:${NC} $(git branch --show-current)"
    echo -e "${BLUE}Recent Commits:${NC}"
    git log --oneline -5
}

# Main script logic
case "$1" in
    "start")
        start_feature "$2"
        ;;
    "finish")
        finish_feature
        ;;
    "rebase")
        rebase_feature
        ;;
    "rebase-interactive")
        interactive_rebase
        ;;
    "squash")
        squash_commits
        ;;
    "trigger-rebase")
        trigger_rebase "$2"
        ;;
    "cleanup")
        cleanup_merged_branches
        ;;
    "sync")
        sync_with_develop
        ;;
    "status")
        show_status
        ;;
    "help"|"-h"|"--help")
        print_help
        ;;
    *)
        echo -e "${RED}Error: Unknown command '$1'${NC}"
        echo ""
        print_help
        exit 1
        ;;
esac
