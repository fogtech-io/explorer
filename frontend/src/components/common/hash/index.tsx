import * as React from 'react';
import { Icon } from '../icon';
import { copyToClipboard } from 'src/utils/clipboard-helper';
import './index.less';

const LAST_SYMBOL_AMOUNT = 6;

interface IHashProps {
    className?: string;
    fontSizePx?: number;
    hash: string;
    prefix?: string;
    hasCopyButton?: boolean;
    keepHashString?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

import * as cn from 'classnames';

export class Hash extends React.PureComponent<IHashProps, any> {
    protected handleClickCopy = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        copyToClipboard(this.props.hash);
    }

    public render() {
        const {
            className,
            fontSizePx,
            hash,
            prefix,
            hasCopyButton,
            onClick,
            keepHashString,
        } = this.props;

        const hash0x =
            keepHashString || hash.startsWith('0x') ? hash : '0x' + hash;

        const len = hash0x.length;
        let start = hash0x;
        let end = '';

        if (len > LAST_SYMBOL_AMOUNT) {
            start = hash0x.slice(0, len - LAST_SYMBOL_AMOUNT);
            end = hash0x.slice(len - LAST_SYMBOL_AMOUNT);
        }

        const style = fontSizePx ? { fontSize: `${fontSizePx}px` } : undefined;

        const showCopyButton = hasCopyButton && 1;

        const Tag = onClick ? 'a' : 'div';

        return (
            <div className={cn('sonm-hash', className)}>
                <Tag
                    href={onClick ? `#${hash0x}` : undefined}
                    onClick={onClick}
                    className="sonm-hash__line"
                    style={style}
                >
                    <span className="sonm-hash__start">
                        {prefix ? prefix + ' ' : null}
                        {start}
                    </span>
                    <span className="sonm-hash__end">{end}</span>
                    {showCopyButton ? (
                        <Icon
                            tag="button"
                            i="Copy"
                            className="sonm-hash__copy"
                            title="copy"
                            onClickCapture={this.handleClickCopy}
                        />
                    ) : null}
                </Tag>
            </div>
        );
    }
}

export default Hash;
