
const tabContents = document.querySelectorAll('.tab_content_block');
const tabButtons = document.querySelectorAll('.tab_content_item');

if (tabContents.length > 0 && tabButtons.length > 0) {
    let currentIndex = 0;

    const showTab = (index) => {
        tabContents.forEach((content, i) => {
            content.style.display = i === index ? 'block' : 'none';
        });

        tabButtons.forEach((button, i) => {
            button.classList.toggle(
                'tab_content_item_active',
                i === index
            );
        });

        currentIndex = index;
    };

    // Показываем первую вкладку
    showTab(0);

    // Ручное переключение по нажатию
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            showTab(index);
        });
    });

    // Автоматическое переключение каждые 5 секунд
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % tabContents.length;
        showTab(nextIndex);
    }, 5000);

    tabButtons.forEach((button, i) => {
    button.classList.toggle(
    'tab_content_item_active',
    i === index
);
});

}