// Smooth scrolling for sidebar navigation links
// document.querySelectorAll('#sidebar-nav a').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const targetSection = document.querySelector(this.getAttribute('href'));
//         window.scrollTo({
//             top: targetSection.offsetTop - 20,
//             behavior: 'smooth'
//         });
//     });
// });

// Highlighting active section link in the sidebar while scrolling
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
