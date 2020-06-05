export const Spinner = (id) =>({
    id: id,
    el: null,
    renderSpinner() {
        const frgSpinner = document.createRange().createContextualFragment(`
        <div class="spinner d-flex justify-content-center align-items-center">
            <div class="spinner-grow text-light" style="width: 4rem; height: 4rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        `);
        this.el = document.getElementById(this.id);
        this.el.innerHTML = ''; //replacing
        this.el.appendChild(frgSpinner);
        return this;
    },
    async delay (delay = 2000) {
        await new Promise(resolve => setTimeout(resolve, delay));
    }
});