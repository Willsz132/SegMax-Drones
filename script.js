
const SITE_CONFIG = {
  empresa: {
    nome: "SegMax",
    nomeComplemento: "Drones",
    nomeCompleto: "SegMax",
    slogan: "Precisão que sobrevoa a sua lavoura.",
  },
  contato: {

    whatsappNumero: "5579988255146",
    whatsappDisplay: "(79) 98825-5146",
    whatsappMensagem: "Olá! Gostaria de saber mais sobre os serviços de pulverização da SegMax Drones.",
    email: "contato@segmaxdrones.com.br",
    endereco: "Carira - SE",
    instagram: "https://www.instagram.com/segmax.drone.solutions/",
  },

  midia: {
    heroVideo: "resource/video.mp4",

  },

  estatisticas: [
    { numero: 15000, sufixo: "+", rotulo: "Hectares pulverizados" },
    { numero: 90, sufixo: "%", rotulo: "Economia de água" },
    { numero: 2, sufixo: "", rotulo: "Drones em operação" },
    { numero: 4, sufixo: " meses", rotulo: "De experiência no campo" },
  ],

  anoFundacao: 2026
};



document.addEventListener("DOMContentLoaded", () => {
  aplicarConfiguracao();
  montarEstatisticas();
  configurarHeader();
  configurarMenuMobile();
  configurarRevelacaoAoRolar();
  configurarFormularioContato();
});

function aplicarConfiguracao() {
  const { empresa, contato, midia } = SITE_CONFIG;

  document.title = `${empresa.nomeCompleto} | Pulverização Agrícola de Precisão`;

  const logoHtml = `${empresa.nome} <span>${empresa.nomeComplemento}</span>`;
  document.querySelectorAll("#logoText, #footerLogo").forEach(el => el.innerHTML = logoHtml);

  document.getElementById("footerSlogan").textContent = empresa.slogan;
  document.getElementById("sobreNomeEmpresa").textContent = empresa.nomeCompleto;

  const whatsappUrl = `https://wa.me/${contato.whatsappNumero}?text=${encodeURIComponent(contato.whatsappMensagem)}`;
  ["whatsappFloat", "navWhatsapp", "ctaWhatsapp"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = whatsappUrl;
  });

  document.getElementById("contatoWhatsappTexto").textContent = contato.whatsappDisplay;
  document.getElementById("footerWhatsappTexto").textContent = contato.whatsappDisplay;
  document.getElementById("contatoEmail").textContent = contato.email;
  document.getElementById("footerEmailTexto").textContent = contato.email;
  document.getElementById("contatoEndereco").textContent = contato.endereco;
  document.getElementById("footerEnderecoTexto").textContent = contato.endereco;

  const redes = [
    { url: contato.instagram, label: "Instagram", path: "M12 2c2.7 0 3.05.01 4.12.06 1.07.05 1.8.22 2.44.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.44.05 1.07.06 1.42.06 4.12s-.01 3.05-.06 4.12c-.05 1.07-.22 1.8-.47 2.44a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.44.47-1.07.05-1.42.06-4.12.06s-3.05-.01-4.12-.06c-1.07-.05-1.8-.22-2.44-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.44C2.01 15.05 2 14.7 2 12s.01-3.05.06-4.12c.05-1.07.22-1.8.47-2.44.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.44 2.5c.64-.25 1.37-.42 2.44-.47C8.95 2.01 9.3 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.17 1.17 0 1 1 0-2.34 1.17 1.17 0 0 1 0 2.34z" },
    { url: contato.facebook, label: "Facebook", path: "M13.5 21v-7.5H16l.5-3.5h-3V7.8c0-1 .3-1.8 1.8-1.8H16.6V2.8C16.3 2.8 15.3 2.7 14.1 2.7c-2.6 0-4.4 1.6-4.4 4.5v2.8H7v3.5h2.7V21z" },
  ].filter(r => r.url);

  const socialHtml = redes.map(r =>
    `<a href="${r.url}" target="_blank" rel="noopener" aria-label="${r.label}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="${r.path}"/></svg></a>`
  ).join("");
  document.getElementById("contatoSocial").innerHTML = socialHtml;
  document.getElementById("footerSocial").innerHTML = socialHtml;

  const anoAtual = new Date().getFullYear();
  document.getElementById("footerCopyright").textContent = `© ${anoAtual} ${empresa.nomeCompleto}. Todos os direitos reservados.`;

  if (midia.heroVideo) {
    const video = document.getElementById("heroVideo");
    video.src = midia.heroVideo;
    video.hidden = false;
  } else if (midia.heroImagem) {
    document.getElementById("heroBg").style.backgroundImage =
      `linear-gradient(160deg, rgba(19,31,23,0.45), rgba(12,20,16,0.8)), url("${midia.heroImagem}")`;
  }


}

function montarEstatisticas() {
  const grid = document.getElementById("statsGrid");
  grid.innerHTML = SITE_CONFIG.estatisticas.map((s, i) => `
    <div class="stat-item">
      <span class="stat-item__numero" data-alvo="${s.numero}" data-sufixo="${s.sufixo}">0${s.sufixo}</span>
      <span class="stat-item__rotulo">${s.rotulo}</span>
    </div>
  `).join("");

  const numeros = grid.querySelectorAll(".stat-item__numero");
  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        animarContador(entrada.target);
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.4 });

  numeros.forEach(n => observer.observe(n));
}

function animarContador(elemento) {
  const alvo = parseInt(elemento.dataset.alvo, 10);
  const sufixo = elemento.dataset.sufixo || "";
  const duracao = 1600;
  const inicio = performance.now();

  function passo(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const facilitado = 1 - Math.pow(1 - progresso, 3);
    const valorAtual = Math.round(alvo * facilitado);
    elemento.textContent = valorAtual.toLocaleString("pt-BR") + sufixo;
    if (progresso < 1) requestAnimationFrame(passo);
  }
  requestAnimationFrame(passo);
}

function configurarHeader() {
  const header = document.getElementById("header");
  const alternar = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  alternar();
  window.addEventListener("scroll", alternar, { passive: true });
}

function configurarMenuMobile() {
  const headers = document.getElementById("headers");
  const nav = document.getElementById("mainNav");

  headers.addEventListener("click", () => {
    const aberto = nav.classList.toggle("is-open");
    headers.setAttribute("aria-expanded", aberto);
  });

  nav.querySelectorAll(".nav__link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      headers.setAttribute("aria-expanded", "false");
    });
  });
}

function configurarRevelacaoAoRolar() {
  const elementos = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("is-visible");
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  elementos.forEach(el => observer.observe(el));
}


function configurarFormularioContato() {
  const form = document.getElementById("contatoForm");
  const msg = document.getElementById("formMsg");

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !telefone || !email) {
      msg.textContent = "Preencha nome, telefone e e-mail para continuar.";
      msg.style.color = "#B3452F";
      return;
    }

    const texto = `Olá! Meu nome é ${nome}.%0ATelefone: ${telefone}%0AE-mail: ${email}%0AMensagem: ${mensagem || "—"}`;
    const url = `https://wa.me/${SITE_CONFIG.contato.whatsappNumero}?text=${texto}`;

    msg.textContent = "Perfeito! Abrindo o WhatsApp para finalizar o contato...";
    msg.style.color = "";
    console.log(url);
    window.location.href = url;
    form.reset();
  });
}
