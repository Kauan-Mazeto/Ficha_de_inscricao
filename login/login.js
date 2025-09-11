document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById("formLogin");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const email = inputEmail.value;
        const senha = inputSenha.value;
        if (email === "admin@admin" && senha === "admin") {
            window.location.href = "../adm/adm-inicial.html";
        } else if (email === "user@user" && senha === "user") {
            window.location.href = "../dashboards/leonardo.html";
        } else {
            alert("Insira informações corretas!");
        }
    });

    const inputSenha = document.getElementById("senhaInput");
    const labelSenha = document.getElementById("labelSenha");
    const spanSenha = document.getElementById("spanSenha");

    const inputEmail = document.getElementById("emailInput");
    const labelEmail = document.getElementById("labelEmail");
    const spanEmail = document.getElementById("spanEmail");

    const botao = document.getElementById("iconeHidden");
    const container = document.getElementById('cadernoSemana');
    const dias = container.children;

    const btnLogin = document.getElementById("botaoLogin")

    for (let i = 0; i < dias.length; i++) {
        dias[i].onclick = function () {
            const check = this.querySelector('.check');
            if (check.style.display === 'block') {
                check.style.display = 'none';
            } else {
                check.style.display = 'block';
            };
        };
    };

    botao.addEventListener("click", () => {
        if (inputSenha.type === "password") {
            inputSenha.type = "text";
            botao.textContent = "Ocultar";
        } else {
            inputSenha.type = "password";
            botao.textContent = "Mostrar";
        }
    });

    inputSenha.addEventListener("input", () => {
        if (inputSenha.value === "") {
            inputSenha.style.border = "2px solid red";
            spanSenha.style.color = "red";
            spanSenha.style.display = "block";
            labelSenha.style.color = "red";
        } else {
            inputSenha.style.border = "2px solid black";
            spanSenha.style.display = "none";
            labelSenha.style.color = "black";
        };
    });

    inputEmail.addEventListener("input", () => {
        if (inputEmail.value === "") {
            inputEmail.style.border = "2px solid red";
            spanEmail.style.display = "block";
            spanEmail.style.color = "red";
            labelEmail.style.color = "red";
        } else {
            inputEmail.style.border = "2px solid black";
            spanEmail.style.display = "none";
            labelEmail.style.color = "black";
        };
    });



    const lapisContainers = document.querySelectorAll(".lapis-container");

    function aplicarCorTema(cor) {
        document.querySelectorAll("*:not(body):not(.ponta-lapis):not(.grafite)").forEach(el => {
            if (el.textContent.trim() !== "") {
                el.style.color = cor;
            }
            const border = window.getComputedStyle(el).borderStyle;
            if (border && border !== "none") {
                el.style.borderColor = cor;
            }
        });
    }

    lapisContainers.forEach(lapis => {
        lapis.addEventListener("click", () => {
            let cor = "";

            if (lapis.classList.contains("cor-padrao")) cor = "orange"; // lápis padrão = amarelo
            else if (lapis.classList.contains("cor-vermelha")) cor = "darkred";
            else if (lapis.classList.contains("cor-azul")) cor = "darkblue";
            else if (lapis.classList.contains("cor-verde")) cor = "seagreen";
            else if (lapis.classList.contains("cor-roxo")) cor = "purple";
            else if (lapis.classList.contains("cor-ciano")) cor = "darkcyan";

            aplicarCorTema(cor);
        });
    });

    const borrachas = document.querySelectorAll(".borracha-borracha");
    borrachas.forEach(borracha => {
        borracha.addEventListener("click", () => {
            aplicarCorTema("black");
        });
    });

    btnLogin.addEventListener("click", () => {
    });


});
