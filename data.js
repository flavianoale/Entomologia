const MORPHOLOGY_DATA = {
  clipeo: { nome: "Clípeo", regiao: "Cabeça", ordens: ["Hemiptera", "Orthoptera", "Coleoptera"], descricao: "Esclerito anterior da cápsula cefálica, entre fronte e labro, importante na inserção de músculos do aparelho bucal.", diagnostico: "Sua conformação auxilia na distinção entre grupos de aparelho bucal mastigador e picador-sugador." },
  labro: { nome: "Labro", regiao: "Cabeça", ordens: ["Coleoptera", "Lepidoptera", "Orthoptera"], descricao: "Estrutura em forma de lábio superior que protege peças bucais internas.", diagnostico: "Forma e mobilidade ajudam na diferenciação de linhagens mastigadoras." },
  mandibulas: { nome: "Mandíbulas", regiao: "Cabeça", ordens: ["Coleoptera", "Orthoptera", "Hymenoptera"], descricao: "Peças pares robustas para corte, trituração e predação.", diagnostico: "Mandíbulas fortes são típicas de mastigadores primários e predadores." },
  maxilas: { nome: "Maxilas", regiao: "Cabeça", ordens: ["Coleoptera", "Lepidoptera", "Diptera"], descricao: "Peças acessórias com palpos, responsáveis por manipulação do alimento.", diagnostico: "Em Lepidoptera formam espiritromba especializada para sucção." },
  labio: { nome: "Lábio", regiao: "Cabeça", ordens: ["Hemiptera", "Diptera", "Hymenoptera"], descricao: "Lábio inferior que atua como suporte para estiletes e palpos.", diagnostico: "Em Hemiptera forma rostro articulado com estiletes perfurantes." },
  antena: { nome: "Antena", regiao: "Cabeça", ordens: ["Todas"], descricao: "Apêndices sensoriais essenciais para quimiorrecepção e orientação espacial.", diagnostico: "Tipos filiforme, clavada, geniculada e aristada têm forte valor taxonômico." },
  olhos: { nome: "Olhos compostos", regiao: "Cabeça", ordens: ["Todas"], descricao: "Órgãos visuais formados por omatídeos, com alta sensibilidade a movimento.", diagnostico: "Tamanho relativo e posição auxiliam no diagnóstico ecológico e comportamental." },
  ocelos: { nome: "Ocelos", regiao: "Cabeça", ordens: ["Odonata", "Hymenoptera", "Orthoptera"], descricao: "Olhos simples dorsais que detectam intensidade luminosa.", diagnostico: "Número de ocelos é usado em chaves para ordens e famílias." },
  pronoto: { nome: "Pronoto", regiao: "Tórax", ordens: ["Orthoptera", "Coleoptera", "Hemiptera"], descricao: "Esclerito dorsal do protórax; frequentemente expandido ou ornamentado.", diagnostico: "Muito útil para separar famílias de Hemiptera e Orthoptera." },
  mesonoto: { nome: "Mesonoto", regiao: "Tórax", ordens: ["Diptera", "Hymenoptera", "Lepidoptera"], descricao: "Segmento dorsal médio torácico associado ao par principal de asas.", diagnostico: "Padrão de cerdas e suturas ajuda no diagnóstico de Diptera." },
  metanoto: { nome: "Metanoto", regiao: "Tórax", ordens: ["Hymenoptera", "Diptera", "Coleoptera"], descricao: "Segmento posterior do tórax; varia conforme redução do segundo par de asas.", diagnostico: "Em Diptera relaciona-se à presença de halteres." },
  coxa: { nome: "Coxa", regiao: "Tórax", ordens: ["Todas"], descricao: "Primeiro segmento da perna, articulado ao tórax.", diagnostico: "Posição da coxa auxilia em identificação funcional de pernas saltatórias/cursoriais." },
  trocanter: { nome: "Trocânter", regiao: "Tórax", ordens: ["Todas"], descricao: "Segmento curto entre coxa e fêmur, importante para mobilidade.", diagnostico: "Pode ser bífido em alguns grupos, apoiando diagnóstico específico." },
  femur: { nome: "Fêmur", regiao: "Tórax", ordens: ["Orthoptera", "Coleoptera", "Hemiptera"], descricao: "Segmento robusto principal de força da perna.", diagnostico: "Hipertrofia do fêmur posterior é marca de pernas saltatórias." },
  tibia: { nome: "Tíbia", regiao: "Tórax", ordens: ["Orthoptera", "Diptera", "Hymenoptera"], descricao: "Segmento alongado com espinhos e esporões em diversas ordens.", diagnostico: "Esporões tibiais têm valor chave para famílias de Orthoptera." },
  tarso: { nome: "Tarso", regiao: "Tórax", ordens: ["Coleoptera", "Diptera", "Hymenoptera"], descricao: "Porção distal segmentada da perna, com pretarso e unhas.", diagnostico: "Número de tarsômeros diferencia táxons importantes." },
  elitros: { nome: "Élitros", regiao: "Asas", ordens: ["Coleoptera"], descricao: "Primeiro par de asas completamente esclerosado e protetor.", diagnostico: "Diagnóstico primário de Coleoptera; cobre asas membranosas posteriores." },
  hemelitros: { nome: "Hemélitros", regiao: "Asas", ordens: ["Hemiptera"], descricao: "Asas anteriores semiesclerosadas na base e membranosas no ápice.", diagnostico: "Característico de Heteroptera dentro de Hemiptera." },
  asaMembranosa: { nome: "Asa membranosa", regiao: "Asas", ordens: ["Lepidoptera", "Hymenoptera", "Odonata", "Diptera"], descricao: "Asa fina com nervação aparente; pode possuir escamas em Lepidoptera.", diagnostico: "Padrão de nervuras e escamas é amplamente usado em chaves." },
  halteres: { nome: "Halteres", regiao: "Asas", ordens: ["Diptera"], descricao: "Segundo par de asas modificado em estruturas de equilíbrio giroscópico.", diagnostico: "Marca diagnóstica inequívoca de Diptera." }
};

const TAXONOMY = {
  Coleoptera: {
    metamorfose: "Holometábola (completa)",
    bucal: "Mastigador",
    asas: "Élitros + asas posteriores membranosas",
    antena: "Variável, predominando filiforme/clavada/geniculada",
    diagnostico: "Élitros rígidos, pronoto evidente, larvas de diferentes guildas tróficas.",
    importancia: "Inclui pragas-chave de grãos, raízes e armazenagem, além de predadores benéficos.",
    familias: {
      Curculionidae: { morfologia: "Rostro alongado e antenas geniculadas clavadas.", dano: "Perfuração de frutos, sementes e colmos.", importancia: "Brocas e gorgulhos economicamente relevantes.", diferencial: "Rostro distinto separa de Chrysomelidae." },
      Chrysomelidae: { morfologia: "Corpo oval, tarsos pseudotetrâmeros, coloração variável.", dano: "Desfolha intensa em plântulas e folhas novas.", importancia: "Pragas recorrentes em soja e hortaliças.", diferencial: "Ausência de rostro longo típico dos curculionídeos." },
      Scarabaeidae: { morfologia: "Antenas lameladas, corpo robusto, larvas corós.", dano: "Ataque radicular e matéria orgânica.", importancia: "Impacto em pastagens e culturas anuais.", diferencial: "Clava antenal lamelada e escavação característica." },
      Carabidae: { morfologia: "Pernas longas cursoriais, mandíbulas fortes, geralmente predadores.", dano: "Baixo dano agrícola direto; controle biológico natural.", importancia: "Família benéfica em manejo integrado.", diferencial: "Habitus alongado e comportamento predatório." }
    }
  },
  Lepidoptera: {
    metamorfose: "Holometábola (completa)",
    bucal: "Sugador sifonador no adulto; mastigador na larva",
    asas: "Dois pares membranosos com escamas",
    antena: "Filiforme ou clavada",
    diagnostico: "Presença de escamas alares, lagartas com falsas pernas abdominais.",
    importancia: "Principal grupo de desfolhadores e brocas em culturas agrícolas.",
    familias: {
      Noctuidae: { morfologia: "Asas anteriores discretas, larvas robustas de hábito noturno.", dano: "Desfolha, corte de plântulas e broqueamento.", importancia: "Grandes perdas em soja, milho e algodão.", diferencial: "Adultos com postura noturna e larvas polífagas." },
      Pyralidae: { morfologia: "Palpos labiais proeminentes, asas triangulares.", dano: "Ataque em grãos armazenados e panículas.", importancia: "Relevante em pós-colheita.", diferencial: "Palpos longos e hábito associado a grãos." },
      Geometridae: { morfologia: "Larvas mede-palmo com redução de falsas pernas.", dano: "Desfolha em frutíferas e florestais.", importancia: "Surtos localizados com alto impacto.", diferencial: "Locomoção em alça típica das larvas." },
      Tortricidae: { morfologia: "Asas anteriores retangulares em repouso, larvas enroladeiras.", dano: "Enrolamento foliar e dano em frutos.", importancia: "Pragas de fruticultura.", diferencial: "Comportamento de enrolar folhas com seda." }
    }
  },
  Diptera: {
    metamorfose: "Holometábola (completa)",
    bucal: "Lambedor, picador-sugador ou esponjoso",
    asas: "Um par funcional + halteres",
    antena: "Aristada ou filiforme curta",
    diagnostico: "Halteres, larvas ápodes em muitos grupos.",
    importancia: "Inclui moscas de frutas e vetores de doenças.",
    familias: {
      Tephritidae: { morfologia: "Asas com desenhos, ovipositor desenvolvido.", dano: "Larvas em frutos, perda comercial direta.", importancia: "Praga-chave em fruticultura.", diferencial: "Padrão alar conspícuo e ataque em frutos." },
      Muscidae: { morfologia: "Adultos de médio porte, aparelho bucal lambedor/esponjoso.", dano: "Contaminação e estresse animal.", importancia: "Sanidade em produção animal.", diferencial: "Morfologia torácica e hábito sinantrópico." },
      Culicidae: { morfologia: "Corpo delgado, pernas longas, probóscide alongada.", dano: "Vetoração de patógenos.", importancia: "Saúde única no agroecossistema.", diferencial: "Escamas e postura de repouso característica." }
    }
  },
  Hemiptera: {
    metamorfose: "Hemimetábola (incompleta)",
    bucal: "Picador-sugador (rostro)",
    asas: "Hemélitros ou asas membranosas",
    antena: "Filiforme segmentada",
    diagnostico: "Rostro articulado, sucção de seiva e transmissão de fitopatógenos.",
    importancia: "Grupo central de pragas em diversas culturas.",
    familias: {
      Pentatomidae: { morfologia: "Corpo em escudo, odor característico.", dano: "Sucção de grãos e frutos, chochamento.", importancia: "Alta relevância em soja e milho.", diferencial: "Escutelo e formato pentagonal." },
      Aphididae: { morfologia: "Corpo mole, sifúnculos abdominais.", dano: "Sucção de seiva e transmissão viral.", importancia: "Pragas de rápido crescimento populacional.", diferencial: "Sifúnculos diagnósticos." },
      Cicadellidae: { morfologia: "Corpo em cunha, pernas posteriores saltatórias.", dano: "Sugador de floema e vetor de molicutes.", importancia: "Impacto em cana e fruteiras.", diferencial: "Saltabilidade e cabeça ampla." },
      Reduviidae: { morfologia: "Rostro curto e forte, muitas espécies predadoras.", dano: "Baixo dano fitófago.", importancia: "Predadores úteis; algumas espécies vetoras.", diferencial: "Sulco prosternal e hábito predatório." }
    }
  },
  Hymenoptera: {
    metamorfose: "Holometábola (completa)",
    bucal: "Mastigador ou mastigador-lambedor",
    asas: "Dois pares membranosos acoplados por hâmulos",
    antena: "Geniculada em muitos grupos",
    diagnostico: "Constrição entre tórax e abdome em Apocrita; ovipositor especializado.",
    importancia: "Inclui polinizadores e parasitoides essenciais ao MIP.",
    familias: {
      Formicidae: { morfologia: "Antenas geniculadas, pedicelo nodal.", dano: "Interferência em colheita e proteção de sugadores.", importancia: "Também atuam como predadoras.", diferencial: "Um ou dois nós no pedicelo." },
      Braconidae: { morfologia: "Vespas pequenas parasitoides, venação reduzida.", dano: "Sem dano direto à cultura.", importancia: "Controle biológico de lagartas e pulgões.", diferencial: "Parasitoides com nervação característica." },
      Apidae: { morfologia: "Corpo piloso, estruturas para coleta de pólen.", dano: "Sem dano direto.", importancia: "Polinização de culturas e serviços ecossistêmicos.", diferencial: "Corbícula em várias espécies." },
      Ichneumonidae: { morfologia: "Vespas alongadas com ovipositor longo.", dano: "Sem dano direto.", importancia: "Parasitoides valiosos no agro.", diferencial: "Asa com célula areolada em muitos gêneros." }
    }
  },
  Orthoptera: {
    metamorfose: "Hemimetábola (incompleta)",
    bucal: "Mastigador",
    asas: "Tégminas + asas posteriores membranosas",
    antena: "Filiforme",
    diagnostico: "Pernas posteriores saltatórias, pronoto desenvolvido.",
    importancia: "Desfolhadores sazonais em gramíneas e hortaliças.",
    familias: {
      Acrididae: { morfologia: "Antenas curtas, tíbias espinhosas, saltadores.", dano: "Desfolha severa em surtos.", importancia: "Impacto em pastagens e cereais.", diferencial: "Antenas curtas diferem de Gryllidae." },
      Gryllidae: { morfologia: "Antenas longas, hábito noturno e estridulação.", dano: "Consumo de sementes e plântulas.", importancia: "Dano localizado em viveiros.", diferencial: "Antenas longas e tegminas sonoras." }
    }
  },
  Thysanoptera: { metamorfose: "Intermediária (paurometábola)", bucal: "Raspador-sugador", asas: "Estreitas com franjas", antena: "Moniliforme curta", diagnostico: "Insetos diminutos, assimetria bucal e asas franjadas.", importancia: "Vetores de tospovírus e danos por raspagem.", familias: {} },
  Isoptera: { metamorfose: "Hemimetábola (incompleta)", bucal: "Mastigador", asas: "Dois pares semelhantes em reprodutores", antena: "Moniliforme", diagnostico: "Sociais, corpo pálido, castas.", importancia: "Danos em madeira e estruturas rurais.", familias: {} },
  Odonata: { metamorfose: "Hemimetábola (incompleta)", bucal: "Mastigador", asas: "Dois pares membranosos com rica nervação", antena: "Setácea curta", diagnostico: "Predadores com olhos grandes e ninfas aquáticas.", importancia: "Indicadores ambientais e controle de insetos.", familias: {} }
};

const DICHOTOMIC_QUESTIONS = [
  { id: "metamorfose", pergunta: "Tipo de metamorfose observado?", options: ["Holometábola (completa)", "Hemimetábola (incompleta)", "Intermediária (paurometábola)"] },
  { id: "asas", pergunta: "Qual padrão alar melhor descreve o exemplar?", options: ["Élitros + asas posteriores membranosas", "Dois pares com escamas", "Um par + halteres", "Hemélitros", "Tégminas + membranosas", "Dois pares membranosos semelhantes", "Asas franjadas", "Dois pares membranosos com nervação rica"] },
  { id: "bucal", pergunta: "Tipo de aparelho bucal predominante?", options: ["Mastigador", "Picador-sugador (rostro)", "Sugador sifonador no adulto; mastigador na larva", "Raspador-sugador", "Lambedor, picador-sugador ou esponjoso", "Mastigador ou mastigador-lambedor"] },
  { id: "antena", pergunta: "Tipo antenal predominante?", options: ["Filiforme", "Geniculada", "Aristada", "Moniliforme", "Setácea curta", "Variável"] }
];
