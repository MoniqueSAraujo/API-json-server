function consultaCEP(cep) {

    cep = cep.replace(/\D/g, '');  // expressão regular -> regex

    if (cep != "") {

            const padraoCep =/^[0-9]{8}$/; //regex

        if (padraoCep.test(cep)){

            document.querySelector('#bairro').setAttribute('readonly','');
            document.querySelector('#cidade').setAttribute('readonly','');
            document.querySelector('#uf').setAttribute('readonly','');

        

            const requisicao = new Request(`https://viacep.com.br/ws/${cep}/json`, {
                 "method": "GET",
                "headers": {
                "Content-type": "application/json"
             }
            });
            fetch(requisicao)
                .then(resposta => resposta.json())
                .then(resposta => {

                 if(!("erro" in resposta)){
                    document.querySelector('#logradouro').value = resposta.logradouro;
                    document.querySelector('#bairro').value = resposta.bairro;
                    document.querySelector('#cidade').value = resposta.localidade;
                    document.querySelector('#uf').value = resposta.uf;

                }else {
                    limparForm();
                    window.alert('CEP não localizado')

                    document.querySelector('#bairro').removeAttribute('readonly');
                    document.querySelector('#cidade').removeAttribute('readonly');
                    document.querySelector('#uf').removeAttribute('readonly');

                    document.querySelector('#logradouro').focus();
                }
            });

        }else{ // caso o cep esteja fora do padrão

                limparForm();
                window.alert('Oformato do CEP é invalido');
            }
        }else { // caso o cepnesteja vazio
                limparForm();
                window.alert('Digite um CEP!');

            }   
}

function limparForm() {

   document.querySelectorAll('input:not(#cep').forEach(input =>{
    input.value = '';
   })
}
 
