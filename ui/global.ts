import { createGlobalStyle } from 'styled-components';

import { ITheme } from './themes';

export const GlobalStyles = createGlobalStyle<ITheme>`
  body {
    padding: 0;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.body};
    background-repeat: 'repeat-y';
    margin: 0;
    font-family: 'Roboto', sans-serif;
    
    html, #root, .app, body {
        height: 100%;
    }
  }

  html, #root, .app, body {
    height: 100%;
}
`;
