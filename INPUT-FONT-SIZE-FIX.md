# Input Font Size Fix - Mobile Zoom Prevention

## Problema
O iOS Safari faz zoom automático quando um input tem `font-size` menor que 16px, causando uma experiência de usuário ruim.

## Solução Implementada
Estilos globais no `src/index.css` que garantem tamanho mínimo de 16px para todos os elementos de input:

```css
/* Global input font-size fix for mobile zoom prevention */
input, textarea, select {
	font-size: 1.6rem; /* 16px minimum to prevent iOS Safari zoom */
}
```

## Benefícios
- ✅ **Automático**: Aplica-se a todos os inputs, textareas e selects
- ✅ **Manutenível**: Uma única regra CSS para todo o projeto
- ✅ **Futuro-proof**: Novos inputs automaticamente seguem o padrão

## Elementos Afetados
- `input` (todos os tipos)
- `textarea`
- `select`

## Notas
- Não afeta outros elementos de texto (títulos, parágrafos, etc.)
- Solução global que funciona com qualquer framework de CSS
- Compatível com Tailwind CSS e outros utilitários
