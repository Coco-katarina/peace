/**
 * Mirror组件通过context获取国际化文案的HOC
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {messages} from './i18n/localeMessages';

export default function localeMessagesWrapper(YComponent) {
    return class extends PureComponent {
        static propTypes = {
            locale: PropTypes.string
        };

        static defaultProps = {
            locale: navigator.language.toLocaleLowerCase()
        };

        constructor(props) {
            super(props);
            this.getWrappedInstance = this.getWrappedInstance.bind(this);
            this.handleFormPreview = this.handleFormPreview.bind(this);
            this.handleFormSave = this.handleFormSave.bind(this);
            this.wrappedInstance = React.createRef();
            this.state = {
                locale: props.locale
            };
        }
        // static getDerivedStateFromProps(nextProps, state) {
        //     if (nextProps.locale !== state.locale) {
        //         return {
        //             locale: nextProps.locale
        //         };
        //     }
        //     return null;
        // }
        
        UNSAFE_componentWillReceiveProps(nextProps) {
            if (nextProps.locale !== this.props.locale) {
                this.setState({
                    locale: nextProps.locale
                });
            }
        }

        getWrappedInstance() {
            return this.wrappedInstance;
        }

        handleFormPreview() {
            //console.log(this.wrappedInstance)
            this.wrappedInstance.current.handleFormPreview();
        }

        handleFormSave() {
            this.wrappedInstance.current.handleFormSave();
        }

        render() {
            const locale = this.state.locale;
            return (
                <YComponent
                    ref={this.wrappedInstance}
                    messages={messages[locale] || messages['en-us']}
                    {...this.props}
                />
            );
        }
    }
}

