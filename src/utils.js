///////////////////////////////////////////////////////////
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits:0
});

export const currencyFormatter = (number) => {
    return formatter.format(number);
}
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