const btnFooter = document.querySelectorAll('.btn-circle');
const btnFooter1 = document.querySelector('.btn_circle1');
const steps = document.querySelectorAll('.steps');
const step1 = document.querySelector('.step_1');
const btnTopic = document.querySelectorAll('.btn_topic');
const btnContinue = document.querySelectorAll('.btn_continue');
const form = document.querySelector('form');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const nameFinal = document.querySelector('.summary_name');
const emailFinal = document.querySelector('.summary_email');
const topics = document.querySelectorAll('.topics')
const btnReset = document.querySelector('.btn_reset');


// First Step : Enabling Next & Previous Buttons

btnFooter.forEach((button,index) => {
    button.addEventListener('click', ()=>{

        // Removing active Class from the buttons
        btnFooter.forEach((btn) =>{btn.classList.remove('active_footer')});

        // Adding active class to the clicked button
        button.classList.add('active_footer');

        //Hide all the steps
        steps.forEach((step) => step.classList.add('visually_hidden'));

        // showing the relevant step
        steps[index].classList.remove('visually_hidden');
    });

});


// Second Step: Selecting The Topic Of Step Two

btnTopic.forEach((btn) => {
    btn.addEventListener('click', ()=>{
        // applying active class
        btn.classList.toggle('active_topic');
    })
});


// Third Step: Continue Buttons for next step only

btnContinue.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (index < steps.length - 1) {
        // Hide current step
        steps[index].classList.add('visually_hidden');
        // Show next step
        steps[index + 1].classList.remove('visually_hidden');
  
        // Update footer buttons
        btnFooter.forEach(btn => btn.classList.remove('active_footer'));
        btnFooter[index + 1].classList.add('active_footer');
      }
    });
});

// Fourth Step: updating first step indput data to third step in real time

// Updating Name
inputName.addEventListener('input', ()=>{
    nameFinal.textContent = inputName.value;
});

// Updating email
inputEmail.addEventListener('input', ()=>{
    emailFinal.textContent = inputEmail.value;
});


// Fifth Step: updatind data from step two to third step

btnTopic.forEach((btn,index) => {
    btn.addEventListener('click', ()=>{
        topics[index].textContent = btn.textContent;
    })
});


// Sixth Step:  resetting the whole steps

btnReset.addEventListener('click', () => {
    // 1.Activating step no.1

    //Hide all the steps
    steps.forEach((step) => step.classList.add('visually_hidden'));

    // showing the relevant step
    step1.classList.remove('visually_hidden');

    // Removing active Class from the buttons
    btnFooter.forEach((btn) =>{btn.classList.remove('active_footer')});

    btnFooter1.classList.add('active_footer');

    // 2.Removing data from first step's inputs
    inputName.value = "";
    inputEmail.value = '';

    // 3.Removing active class from topic buttons

    btnTopic.forEach((btn) => {
        // applying active class
        btn.classList.remove('active_topic');
    });

})

// Seven Step: Emptying inputs on relaod
window.onload = function () {
    form.reset();
}
const wrapper = document.querySelector(".wrapper");
let startX = 0;
let currentStep = 0;
const dots = document.querySelectorAll(".btn-circle");

function showStep(index) {
  steps.forEach((step, i) =>
    step.classList.toggle("visually_hidden", i !== index)
  );

  dots.forEach((dot, i) =>
    dot.classList.toggle("active_footer", i === index)
  );
}

// Pointer down
wrapper.addEventListener("pointerdown", (e) => {
  startX = e.clientX;
  wrapper.setPointerCapture(e.pointerId);
});

// Pointer up
wrapper.addEventListener("pointerup", (e) => {
  const diffX = e.clientX - startX;

  if (Math.abs(diffX) > 50) {
    if (diffX < 0 && currentStep < steps.length - 1) {
      currentStep++;
    } else if (diffX > 0 && currentStep > 0) {
      currentStep--;
    }
    showStep(currentStep);
  }

  wrapper.releasePointerCapture(e.pointerId);
});
