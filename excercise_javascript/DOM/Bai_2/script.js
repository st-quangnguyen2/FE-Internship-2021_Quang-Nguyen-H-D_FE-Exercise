var plans = [
  {
    name: 'Basic',
    title: '$10 / month',
    include: '10 users include',
    storage: '2 GB of storage',
    support: 'Email support',
    access: 'Help center access',
    button: {
      text: 'Get start',
      type: 'btn-outline'
    }
  },
  {
    name: 'Pro',
    title: '$30 / month',
    include: '100 users include',
    storage: '20 GB of storage',
    support: 'Priority email support',
    access: 'Help center access',
    button: {
      text: 'Buy now',
      type: 'btn-primary'
    }
  }
];

var convertHTML = plans.map(function (plan) {
  return `
    <li class="list-item">
      <div class="plan">
        <div class="plan-header">
          <h4 class="plan-title txt-center">${plan.name}</h4>
        </div>
        <div class="plan-body">
          <h5 class="plan-price txt-center">${plan.title}</h5>
          <p class="plan-include txt-center">${plan.include}</p>
          <p class="plan-storage txt-center">${plan.storage}</p>
          <p class="plan-support txt-center">${plan.support}</p>
          <p class="plan-access txt-center">${plan.access}</p>
          <a class="plan-link btn ${plan.button.type}" href="#">${plan.button.text}</a>
        </div>
      </div>
    </li>
  `;
}).join('');

document.getElementById('plan-group').innerHTML = convertHTML;
