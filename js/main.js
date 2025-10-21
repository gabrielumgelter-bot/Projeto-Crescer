// main.js
document.addEventListener('DOMContentLoaded', function(){
  // atualiza anos no footer
  const y = new Date().getFullYear();
  document.getElementById('year')?.textContent = y;
  document.getElementById('year2')?.textContent = y;
  document.getElementById('year3')?.textContent = y;
  document.getElementById('yearDash')?.textContent = y;

  // nav toggle para mobile
  const navBtn = document.getElementById('navToggle');
  const menu = document.getElementById('menuList');
  if(navBtn){
    navBtn.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      menu.style.display = expanded ? '' : 'block';
    });
  }

  // máscaras simples (CPF, telefone, CEP)
  function setMask(el, maskFn){
    el.addEventListener('input', function(e){
      const pos = this.selectionStart;
      const oldLen = this.value.length;
      this.value = maskFn(this.value);
      const newLen = this.value.length;
      this.selectionStart = this.selectionEnd = pos + (newLen - oldLen);
    });
  }

  function onlyDigits(v){ return v.replace(/\D/g,''); }

  function maskCPF(v){
    v = onlyDigits(v).slice(0,11);
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
    return v;
  }

  function maskPhone(v){
    v = onlyDigits(v).slice(0,11);
    if(v.length <= 10){
      v = v.replace(/(\d{2})(\d)/,'($1) $2');
      v = v.replace(/(\d{4})(\d)/,'$1-$2');
    } else {
      v = v.replace(/(\d{2})(\d)/,'($1) $2');
      v = v.replace(/(\d{5})(\d)/,'$1-$2');
    }
    return v;
  }

  function maskCEP(v){
    v = onlyDigits(v).slice(0,8);
    v = v.replace(/(\d{5})(\d)/,'$1-$2');
    return v;
  }

  const cpfEl = document.getElementById('cpf');
  const phoneEl = document.getElementById('phone');
  const cepEl = document.getElementById('cep');

  if(cpfEl) setMask(cpfEl, maskCPF);
  if(phoneEl) setMask(phoneEl, maskPhone);
  if(cepEl) setMask(cepEl, maskCEP);

  // submissão do formulário: validação nativa e extra (CPF simples)
  const form = document.getElementById('registrationForm');
  if(form){
    form.addEventListener('submit', function(e){
      if(!form.checkValidity()){
        form.reportValidity();
        e.preventDefault();
        return;
      }

      const cpf = cpfEl?.value || '';
      const cpfDigits = (cpf.match(/\d/g) || []).join('');
      if(cpfDigits.length !== 11){
        alert('CPF inválido. Verifique o número.');
        e.preventDefault();
        return;
      }

      const payload = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        cpf: cpfDigits,
        phone: (phoneEl?.value || '').replace(/\D/g,''),
        birthdate: document.getElementById('birthdate').value,
        cep: (cepEl?.value || '').replace(/\D/g,''),
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        role: document.getElementById('role').value,
        message: document.getElementById('message').value
      };

      console.log('Payload pronto para envio:', payload);
      alert('Cadastro enviado com sucesso (simulação). Verifique console para payload.');
      e.preventDefault();
    });
  }
});
