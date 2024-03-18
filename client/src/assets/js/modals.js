const showModal = () => {
    // Display modal
    const modal = document.getElementById('error-modal');
    modal.style.display = 'block';
    // Hide after 3 seconds
    timeoutId = setTimeout(() => {
        modal.style.display = 'none';
    }, 5000); 
};
// Add event listener to close button
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('error-modal').style.display = 'none';
    clearTimeout(timeoutId);
});