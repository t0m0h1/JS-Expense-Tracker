document.addEventListener('DOMContentLoaded', () => {
    const addExpenseBtn = document.getElementById('add-expense-btn');
    const expenseDescription = document.getElementById('expense-description');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const renderExpenses = () => {
        expenseList.innerHTML = '';
        let total = 0;

        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.description}: $${expense.amount}
                <button data-index="${index}" class="delete-btn">X</button>
            `;
            expenseList.appendChild(li);
            total += expense.amount;
        });

        totalAmount.textContent = total.toFixed(2);
    };

    const addExpense = () => {
        const description = expenseDescription.value;
        const amount = parseFloat(expenseAmount.value);

        if (description && !isNaN(amount) && amount > 0) {
            expenses.push({ description, amount });
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
            expenseDescription.value = '';
            expenseAmount.value = '';
        } else {
            alert('Please enter a valid description and amount');
        }
    };

    const deleteExpense = (index) => {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            deleteExpense(index);
        }
    });

    addExpenseBtn.addEventListener('click', addExpense);

    renderExpenses();
});
