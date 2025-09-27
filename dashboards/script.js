
document.addEventListener('DOMContentLoaded', () => {

  

  const cardCount = document.querySelectorAll('.swiper-slide').length;
  const card_meio = Math.floor(cardCount / 2);

  const swiper = new Swiper('.swiper', {
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 60,
    initialSlide: card_meio,
    rewind: true,

    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 160,
      modifier: 1,
      slideShadows: false
    },

    speed: 800,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    grabCursor: true,
  });

  new Typed('#typing', {
    strings: ['Escolha o curso de sua preferência...', 'Cursos Gratuitos e com Diploma!', 'Cursos Integrados com o Ensino Médio!'],
    typeSpeed: 100,
    backSpeed: 25,
    loop: true,
    showCursor: false
  });

  const btnEscolherCurso = document.querySelector('.btn-escolher-curso');
  const modal = document.getElementById('modal');
  const card = document.getElementById('card');
  const formTitulo = document.getElementById('form-titulo');
  const cursoInput = document.getElementById('curso-input');
  const formTraz = document.querySelector('.card-back form');

  btnEscolherCurso.addEventListener('click', () => {
    const activeSlide = document.querySelector('.swiper-slide-active');

    const cursoNome = activeSlide.querySelector('p').textContent;
    const cardCor = window.getComputedStyle(activeSlide).background;
    formTitulo.textContent = cursoNome;
    cursoInput.value = cursoNome;
    card.querySelector('.card-inner').style.background = cardCor;


    modal.classList.add('active');
  });

  const fecharModal = () => {
    modal.classList.remove('active');
    card.classList.remove('flipped');
  };

  document.addEventListener('click', (e) => {

    if (e.target.classList.contains('nextBtn') && e.target.type !== 'submit') {
      e.preventDefault();
      card.classList.add('flipped');
    }

    if (e.target.classList.contains('close-btn')) {
      fecharModal();
    }
  });

  document.addEventListener('click', (e) => {
    if(e.target === modal) {
      fecharModal();
    }
  });
  

  

  formTraz.addEventListener('submit', (e) => {
    e.preventDefault();
    fecharModal();
  });

  const btnEscola = document.querySelector('.btn-trocar-escola');
  const menuEscola = document.getElementById('opcoes-escola');

  btnEscola.addEventListener('click',(e) => {
      e.stopPropagation();
    if (menuEscola.style.display === 'block') {
      menuEscola.style.display = 'none';
    } else {
      menuEscola.style.display = 'block';
    }
  });

  document.addEventListener('click', () => {
    menuEscola.style.display = 'none';
  });

  
function formatRG(rg) {
   let value = rg.value.replace(/\D/g, '');  
   if (value.length <= 2) {
    rg.value = value; 

   } else if (value.length <= 5) {
    rg.value = value.replace(/^(\d{2})(\d{1,3})$/, '$1.$2'); 

   } else if (value.length <= 8) {
    rg.value = value.replace(/^(\d{2})(\d{3})(\d{1,3})$/, '$1.$2.$3');
     
   } else if (value.length <= 9) {
    rg.value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4'); 
   }
}

function formatCPF(cpf) {
   let value = cpf.value.replace(/\D/g, '');  
   if (value.length <= 3) {
       cpf.value = value; 
   } else if (value.length <= 6) {
       cpf.value = value.replace(/^(\d{3})(\d{1,3})$/, '$1.$2'); 
   } else if (value.length <= 9) {
       cpf.value = value.replace(/^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3'); 
   } else if (value.length <= 11) {
       cpf.value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4'); 
   }
}

const rgInput = document.getElementById('rg');
const cpfInput = document.getElementById('cpf');
if (rgInput) {
  rgInput.addEventListener('input', function() { formatRG(this); });
}
if (cpfInput) {
  cpfInput.addEventListener('input', function() { formatCPF(this); });
}

const form = document.getElementById("fixaAluno");
const notificacaoCard = document.getElementById("notification-card");

form.addEventListener("submit", function (event) {
   event.preventDefault();

   notificacaoCard.style.display = "block";

   setTimeout(() => {
      notificacaoCard.classList.add('show');
   }, 10);
   setTimeout(() => {
      notificacaoCard.classList.remove('show');
   }, 3000);

   form.reset();
});

  function formatoTelefone(telefone) {
    let value = telefone.value.replace(/\D/g, '');

    if (value.length === 0) {
      telefone.value = '';
      return;
    }
    if (value.length <= 2) {
      telefone.value = value;
      return;
    }
    if (value.length <= 6) {
      telefone.value = `(${value.slice(0,2)}) ${value.slice(2)}`;
      return;
    }
    if (value.length <= 10) {
      telefone.value = `(${value.slice(0,2)}) ${value.slice(2, value.length-4)}-${value.slice(-4)}`;
      return;
    }
    
    telefone.value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7,11)}`;
  }

  const telefone = document.querySelectorAll('#telefone');

  telefone.forEach(function(input) {
    input.addEventListener('input', function() { formatoTelefone(this); });
  });

  function mensagem() {
    let msg = document.getElementById('msg-enviado');

    if (!msg) {
      msg = document.createElement('div');
      msg.id = 'msg-enviado';
      msg.style.position = 'fixed';
      msg.style.top = '30px';
      msg.style.left = '50%';
      msg.style.transform = 'translateX(-50%)';
      msg.style.background = '#4caf50';
      msg.style.color = '#fff';
      msg.style.padding = '16px 32px';
      msg.style.borderRadius = '8px';
      msg.style.fontSize = '18px';
      msg.style.zIndex = '9999';
      msg.textContent = 'Formulário enviado com sucesso!';
      document.body.appendChild(msg);
    }
      
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 2500);
  }

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      mensagem();
    });
  });

  const ufInput = document.getElementById('estado');
  if (ufInput) {
    ufInput.addEventListener('input', function() {

      this.value = this.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
    });
  }

});
