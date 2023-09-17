import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // language resources
    resources: {
      en: {
        translation: {
         welcome: "Welcome to React",
         addBudget:"Add Budget",
         addExpense:"Add Expense",
         viewExpenses:"View Expenses",
         delete:"Delete",
         add:"Add",
         close:"Close",
         expenses:"Expenses",
         total:"Total",
         addNewBudget:"Add A New Budget",
         addNewExpense:"Add A New Expense",
         desc:"Description",
         amount:"Amount",
         name:"Name",
         maxSpending:"Maximum Spending"
        }
      },
      ar: {
        translation: {
         welcome: "أهلاً وسهلاً",
         addBudget:"إضافة ميزانية",
         addExpense:"إضافة مصروف",
         viewExpenses:"عرض المصاريف",
         delete:"حذف",
         add:"إضافة",
         close:"إغلاق",
         expenses:"مصاريف",
         total:"المجموع الكلي",
         addNewBudget:"إضافة ميزانية جديدة",
         addNewExpense:"إضافة مصروف جديد",
         desc:"الوصف",
         amount:"المبلغ",
         name:"الاسم",
         maxSpending:"الحد الأقصى"

        }
      },
    }
  });

export default i18n;