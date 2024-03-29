import styled from '@emotion/styled';

export const Gallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding-inline: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
