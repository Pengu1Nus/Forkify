import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _renderPrevButton(currPage) {
    return `
      <button data-goto="${
        currPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPage - 1}</span>
      </button>
      `;
  }
  _renderNextButton(currPage) {
    return ` 
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
  }
  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, have other pages
    if (currPage === 1 && numPages > 1) {
      return this._renderNextButton(currPage);
    }

    // last page
    if (currPage === numPages && numPages > 1) {
      return this._renderPrevButton(currPage);
    }

    // Other page
    if (currPage < numPages) {
      return (
        this._renderPrevButton(currPage) + this._renderNextButton(currPage)
      );
    }

    // Page 1, doesn't have other pages
    return '';
  }
}

export default new PaginationView();
