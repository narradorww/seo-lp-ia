# SEO Landing Page + Magic Mirror 🪞

Este é um projeto de estudo desenvolvido por **Rodrigo Alexandre**, com foco em:

- SEO com Next.js 15 + TypeScript
- Coleta e exibição de estatísticas reais dos visitantes
- Interação com o usuário via "Espelho Mágico" (LLM-ready)
- Layout responsivo com design profissional
- Testes automatizados
- Deploy contínuo via Vercel
- Notificações de visita por e-mail com Resend

---

## 🔥 Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/docs)
- [TypeScript](https://www.typescriptlang.org/)
- [Resend](https://resend.com/) (e-mail API)
- [ipapi.co](https://ipapi.co/) (geolocalização via IP)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest](https://jestjs.io/)
- CSS Modules + globals.css

---

## 📦 Funcionalidades

- Header com menu responsivo e links sociais (GitHub, LinkedIn, Medium)
- Área de portfólio com carrossel de projetos estilo Pokédex (em desenvolvimento)
- "Espelho Mágico" com input do usuário (suporte futuro a LLMs)
- Estatísticas reais de visitante: IP, local, agente, referência, organização
- Envio automático de estatísticas por e-mail via API `/notify`

---

## 🚀 Como rodar localmente

```bash
yarn install
yarn dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Variáveis de ambiente

Crie um arquivo `.env.local` com:

```
RESEND_API_KEY=chave_aqui
EMAIL_FROM=noreply@seudominio.com
EMAIL_TO=seu@email.com
```

---

## 🧪 Rodando os testes

```bash
yarn test
```

---

## ✨ Feito por

[Rodrigo Alexandre](https://www.linkedin.com/in/rodrigoalexandre79/)

Desenvolvedor React Native com foco em Mobile, Cloud e Performance.