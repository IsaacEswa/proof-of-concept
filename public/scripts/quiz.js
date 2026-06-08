// NEW JS ENHANCEMENT CODE
const component = document.querySelector('.quiz-component');
component.classList.add('cards-stacked');
component.querySelectorAll('.single-quiz-question').forEach(q => q.classList.add('stacked'));

// 1. Hulpfunctie: geef de bovenste card
const topCard = () => component.querySelector('.stacked:not(.gone)');

// 2. Dismiss een card in een richting
function dismissCard(card, direction) {
    card.classList.replace('dragging', direction) || card.classList.add(direction);
    card.classList.add('gone');
}

// 3. Drag-logica per card
component.querySelectorAll('.stacked').forEach(card => {
    let x0, y0;

    card.addEventListener('pointerdown', e => {
        if (e.target.closest('input, label') || card !== topCard()) return;
        card.setPointerCapture(e.pointerId);
        card.classList.add('dragging');
        [x0, y0] = [e.clientX, e.clientY];
        card.style.setProperty('--delta-x', 0);
        card.style.setProperty('--delta-y', 0);
    });

    card.addEventListener('pointermove', e => {
        if (!card.classList.contains('dragging')) return;
        const dx = e.clientX - x0;
        card.style.setProperty('--delta-x', dx);
        card.style.setProperty('--delta-y', e.clientY - y0);
        if (Math.abs(dx) > 100) dismissCard(card, dx > 0 ? 'right' : 'left');
    });

    card.addEventListener('pointerup', () => {
        if (!card.classList.contains('dragging')) return;
        card.classList.remove('dragging');
        card.style.setProperty('--delta-x', 0);
        card.style.setProperty('--delta-y', 0);
    });
});