interface QuestionProps {
  code: number;
  question: string;
  answer: string;
}

export default {
  questions: [
    {
      code: 1,
      question: "Quem deve divulgar os dados nas páginas de transparência?",
      answer:
        "Todos os órgão e entidades da Administração Direta e Indireta (Autarquias, Fundações, Empresas Públicas e Sociedades de Economia Mista) do Poder Executivo devem manter, em seus sítios na Internet, Páginas de Transparência Pública.",
    },
    {
      code: 2,
      question: "Quem deve divulgar os dados nas páginas de transparência?",
      answer:
        "Todos os órgão e entidades da Administração Direta e Indireta (Fundações, Empresas Públicas e Sociedades de Economia Mista) do Poder Executivo devem manter, em seus sítios na Internet, Páginas de Transparência Pública.",
    },
  ] as QuestionProps[],
};
