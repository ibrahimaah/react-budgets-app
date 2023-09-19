///////////////////////////////////////////////////////////
export const currencyFormatter = (number, code) => {
  if (code === 'ar') {
    return `<span class='invisible'>ل</span>${number} <span>ل.س </span>`
  } else if (code === 'en') {
    return `${number} SYP`
  }
};

///////////////////////////////////////////////////////////

// export const getColorByName = (name) => {
//     switch (name) {
//         case 'primary':
//             return '#0d6efd'
//             break;
//         case 'warning':
//             return '#ffc107'
//             break;
//         case 'danger':
//             return '#dc3545'
//             break;
//         default:
//             return null
//             break;
//     }
// }

////////////////////////////////////////////////////////////
export function getCardColor(amount,max)
{

  //max=null i.e it is unCategorized Budget
  if (!max) {
    return 'secondary'
  }

  let ratio = amount/max

  if(ratio < 0.5)
  {
    return'primary'
  }
  else if(ratio < 0.75)
  {
    return 'warning'
  }
  else
  {
    return 'danger'
  } 
}