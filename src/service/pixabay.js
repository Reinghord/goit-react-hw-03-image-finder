let PAGE_COUNTER = 1;

function pixFetch(searchValue) {
  const BASIC_URL = `https://pixabay.com/api/`;
  const searchParam = new URLSearchParams({
    key: '28712886-1cb23b606877bc8498f4e16b7',
    q: `${searchValue}`,
    image_type: 'photo',
    orientation: 'horizontal',
    page: `${PAGE_COUNTER}`,
    per_page: 12,
  });

  return fetch(`${BASIC_URL}?${searchParam}`).then(response => {
    if (response.ok) {
      PAGE_COUNTER += 1;
      return response.json();
    }
    throw new Error('ERROR');
  });
}

export default pixFetch;

//Function to reset PAGE_COUNTER
export const resetPage = () => {
  PAGE_COUNTER = 1;
};
