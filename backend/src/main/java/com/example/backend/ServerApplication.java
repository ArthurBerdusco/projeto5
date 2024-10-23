package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {

    // @Autowired
    // private UsuarioRepository usuarioRepository;

    // @Autowired
    // private OperadorRepository operadorRepository;

    // @Autowired
    // private MotoristaRepository motoristaRepository;

    // @Autowired
    // private ResponsavelRepository responsaveisRepository;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    // @Autowired
    // private EscolaRepository escolaRepository;

    // @Autowired
    // private EnderecoRepository enderecoRepository;

    // @Autowired VanRepository vanRepository;

    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

//    @EventListener
//     public void handleContextRefreshEvent(ContextRefreshedEvent context) {

//         if (usuarioRepository.count() == 0) {

//             // Criando Operador
//             Usuario u = new Usuario();
//             Operador o = new Operador();
//             u = new Usuario();
//             u.setEmail("bryan@email.com.br");
//             u.setSenha(passwordEncoder.encode("1234"));
//             u.setRole(Role.OPERADOR);
//             o.setUsuario(u);
//             usuarioRepository.save(u);
//             operadorRepository.save(o);

//             // Criando Motorista (Mika) com Endereço
//             Motorista m = new Motorista();
//             m.setEmail("myka@email.com.br");
//             m.setNome("Mika Souza");
//             m.setTelefone("(11) 92830-9903");
//             m.setDataNascimento(LocalDate.of(2004, 2, 10));
//             m.setCpf("35829012247");
//             m.setStatus("ATIVO");

//             u = new Usuario();
//             u.setEmail("mika@email.com.br");
//             u.setSenha(passwordEncoder.encode("1234"));
//             u.setRole(Role.MOTORISTA);
//             m.setUsuario(u);
//             usuarioRepository.save(u);
//             motoristaRepository.save(m);

//             Endereco enderecoMika = new Endereco();
//             enderecoMika.setRua("Av. Paulista");
//             enderecoMika.setNumero("1000");
//             enderecoMika.setBairro("Bela Vista");
//             enderecoMika.setCidade("São Paulo");
//             enderecoMika.setCep("01311-200");
//             enderecoMika.setEstado("SP");
//             enderecoMika.setComplemento("Apto 101");
//             enderecoRepository.save(enderecoMika);

//             m.setEndereco(enderecoMika);

//             Van van = new Van();
//             van.setAnoFabricacao(Year.of(2019));
//             van.setMotorista(m);
//             vanRepository.save(van);
            
//             motoristaRepository.save(m);

//             // Criando Responsavel (Ryu) com Endereço
//             Responsavel r = new Responsavel();
//             r.setEmail("ryu@email.com.br");
//             r.setNome("Ryu Silva");
//             r.setTelefone("(11) 97893-0443");
//             r.setDataNascimento(LocalDate.of(2004, 2, 10));
//             r.setCpf("93102981213");
//             r.setStatus("ATIVO");

//             u = new Usuario();
//             u.setEmail("ryu@email.com.br");
//             u.setSenha(passwordEncoder.encode("1234"));
//             u.setRole(Role.RESPONSAVEL);
//             r.setUsuario(u);
//             usuarioRepository.save(u);
//             responsaveisRepository.save(r);

//             Endereco enderecoRyu = new Endereco();
//             enderecoRyu.setRua("Rua da Consolação");
//             enderecoRyu.setNumero("200");
//             enderecoRyu.setBairro("Consolação");
//             enderecoRyu.setCidade("São Paulo");
//             enderecoRyu.setCep("01302-000");
//             enderecoRyu.setEstado("SP");
//             enderecoRyu.setComplemento("Casa");
//             enderecoRepository.save(enderecoRyu);

//             r.setEndereco(enderecoRyu);
//             responsaveisRepository.save(r);
//         }

//         if (escolaRepository.count() == 0) {
//             // Criar as escolas e salvá-las no banco
//             criarEscolas();
//         }
//     }

//     private void criarEscolas() {
//         // Lista de escolas com nome, rua, número e telefone
//         String[][] escolas = {
//                 { "Ápice Educação Infantil", "R. José Janarelli", "348", "3721-7690" },
//                 { "Arca da Aliança", "R. Gal. Eldes de Souza Guedes", "55", "3749-9410" },
//                 { "Balou", "R. Domingos Lopes da Silva", "325", "3739-0092" },
//                 { "Blue Sky", "R. Mal. Hastimphilo de Moura", "27", "3743-5108" },
//                 { "Colégio Anglo Morumbi", "R. Diogo Pereira", "324", "3740-1000" },
//                 { "Colégio Ascensional Mele", "R. Ascensional", "184", "3744-7107" },
//                 { "Colégio Cristóvão Colombo", "R. Alexandre Benois", "352", "3744-1005" },
//                 { "Colégio Evolve", "R. Clementine Brenne", "385", "3502-7100" },
//                 { "Colégio Guilherme Dumont Villares", "Av. Dr. Guilherme Dumont Villares", "723", "3743-5531" },
//                 { "Colégio Miguel de Cervantes", "Av. Jorge João Saad", "905", "3779-1800" },
//                 { "Colégio Modular", "R. Clementine Brenne", "378", "3742-8194" },
//                 { "Colégio Morumbi Sul", "Av. Nossa Senhora do Bom Conselho", "351", "5818-0600" },
//                 { "Colégio Nossa Senhora do Morumbi", "Av. Giovanni Gronchi", "4000", "3742-5513" },
//                 { "Colégio Pentágono", "R. Nélson Gama de Oliveira", "1244", "3747-6277" },
//                 { "Colégio Portal do Futuro", "R. Ministro Heitor Bastos Tigre", "164", "3746-0356" },
//                 { "Colégio Porto Seguro - Morumbi", "R. Floriano Peixoto Santos", "55", "3749-3250" },
//                 { "Colégio Porto Seguro - Panamby", "R. Itapaiúna", "1355", "3746-1600" },
//                 { "Colégio Porto Seguro - Portinho", "R. Itapaiúna", "1350", "3501-8857" },
//                 { "Colégio Saint Exupéry", "R. José Jannarelli", "621", "3721-9466" },
//                 { "Colégio Santo Américo", "R. Santo Américo", "275", "2244-1888" },
//                 { "Colégio São Domingos Sávio", "Av. Intercontinental", "220", "3751-3286" },
//                 { "Colégio São Luiz (Unidade Maracanã)", "R Sta Archélia", "200", "5513-5521" },
//                 { "Colégio Universitário", "Rua Diogo Pereira", "324", "3740-1000" },
//                 { "CPV", "R. Domingos Lopes da Silva", "34", "3742-4530" },
//                 { "Doce Começo", "R. Regente Leon Kaniefsky", "493", "3721-4340" },
//                 { "El Miguelito", "Av. Jorge João Saad", "786", "3772-6967" },
//                 { "Escola Apoio", "R. Mal. Juarez Távora", "106", "3744-3558" },
//                 { "Escola Cidade Jardim/ Play Pen", "Pça. Prof. Américo de Moura", "101", "3812-9122" },
//                 { "Escola Copo de Leite", "R. Almadén", "55", "3746-6567" },
//                 { "Escola da Vila", "R. Alfredo Mendes da Silva", "55", "3751-5255" },
//                 { "Escola de Educação Infantil Fifó", "Rua Prof. Santiago Dantas", "280", "3758-8086" },
//                 { "Escola de Educação Infantil Pat Way", "R. Dr. Clóvis de Oliveira", "488", "3721-4128" },
//                 { "Escola Graduada - Graded School", "Av. Giovanni Gronchi", "4710", "3747-4800" },
//                 { "Escola Habitat", "R. Dr. Fonseca Brasil", "145", "3749-0303" },
//                 { "Escola José Bento Monteiro Lobato", "Av. Dr. Guilherme Dumont Villares", "498", "3744-9242" },
//                 { "Escola Soleil", "R. Delegado Moraes Novaes", "7", "3773-5086" },
//                 { "Escola Soletrar", "R. Francisco Preto", "131", "3771-5308" },
//                 { "Escola Stimulu Infantil", "R. Dr. Luiz Migliano", "425", "3773-8160" },
//                 { "Escola Ursinho Branco - Unidade Morumbi", "Av. Jorge João Saad", "1052", "3742-7829" },
//                 { "Escola Ursinho Branco - Unidade Real Parque", "R. Adalívia de Toledo", "251", "3758-2039" },
//                 { "Escola Submarino Amarelo", "R. Frei Bonifácio Dux", "149", "3749-9760" },
//                 { "Espaço Morumbi", "R. Panonia", "170", "3507-0621" },
//                 { "Integration School", "R. São Pedro Fourier", "189", "3742-6100" },
//                 { "Jardim Escola Equilíbrio", "R. Prof. Hilário Veiga de Carvalho", "60", "3742-0521" },
//                 { "Kampus School", "R. Dep. João Sussumu Hirata", "750", "3501-4066" },
//                 { "Kinder Kampus", "R. Dep. João Sussumu Hirata", "480", "3743-7552" },
//                 { "Objetivo", "Av. Duquesa de Goiás", "262", "3758-0073" },
//                 { "Pio XII - Colégio Franciscano", "R. Colégio Pio XII", "233", "3759-5050" },
//                 { "Piu-Piu Escola de Educação Infantil", "R. Mal. Juarez Távora", "220", "3743-2449" },
//                 { "Primetime", "R. José Gonçalves", "30", "3739-4621" },
//                 { "Quintal", "R. Joaquim C. de Azevedo Marques", "1234", "3742-5899" },
//                 { "Scuola Italiana Eugênio Montale", "R. José Gustavo Bush", "75", "3759-5959" },
//                 { "See-Saw/Panamby Bilingual School", "R. Visconde de Nacar", "86", "3758-2241" }
//         };

//         // Percorre a lista e cria uma nova escola para cada linha de dados
//         for (String[] escola : escolas) {
//             Escola e = new Escola();
//             e.setNome(escola[0]);
//             e.setRua(escola[1]);
//             e.setNumero(escola[2]);
//             e.setTelefone(escola[3]);
//             e.setStatus("ATIVA"); // Define um status padrão, pode ser alterado conforme a necessidade
//             escolaRepository.save(e); // Salva a escola no banco de dados
//         }
//     }


}
