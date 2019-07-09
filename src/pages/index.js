import React from 'react';
import { i18n, withTranslation } from '../../i18n';

class Home extends React.Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    };
  }
  render() {
    return (
      <div>
        {this.props.t('title')}

        <button
          onClick={() => {
            i18n.changeLanguage(i18n.language === 'pt-BR' ? 'en' : 'pt-BR');
          }}
        >
          Change locale
        </button>
      </div>
    );
  }
}

export default withTranslation('common')(Home);
