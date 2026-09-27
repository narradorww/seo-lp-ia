export const games = [
  {
    id: '001',
    slug: 'macunaima',
    title: 'Macunaíma',
    subtitle: 'A trilha das saúvas',
    genre: 'Arcade · Snake',
    players: '1 jogador',
    currentVersion: 'v2',
    versions: [
      { id: 'v1', title: 'Primeiro protótipo', description: 'O ponto de partida: validar a mecânica da cobrinha, o crescimento das saúvas e os obstáculos, com gráficos simples.' },
      { id: 'v2', title: 'Arte e controles de celular', description: 'Pixel art mais detalhada, capa em homenagem a Grande Otelo e direcional para destros e canhotos, além de gestos na tela.' },
    ],
    cover: '/arcade/macunaima/assets/macunaima-otelo.webp',
    description: 'Uma saúva, uma folha e uma floresta inteira pela frente. Faça sua trilha crescer nesta releitura brasileira do clássico da cobrinha.',
  },
] as const;
