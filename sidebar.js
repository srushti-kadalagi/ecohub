window.addEventListener('scroll', () => {
    let fromTop = window.scrollY;
    const sections = document.querySelectorAll('.content-section');
    const links = document.querySelectorAll('#sidebar-nav a');

    sections.forEach(section => {
        if (fromTop >= section.offsetTop - 50 && fromTop < section.offsetTop + section.offsetHeight) {
            links.forEach(link => {
                link.classList.remove('active');
                if (section.id === link.getAttribute('href').substring(1)) {
                    link.classList.add('active');
                }
            });
        }
    });
});
