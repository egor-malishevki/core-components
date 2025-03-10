import React, { ButtonHTMLAttributes, FC, SVGProps } from 'react';
import cn from 'classnames';
import { Button, ButtonProps } from '@alfalab/core-components-button';
import { FieldProps as BaseFieldProps } from '@alfalab/core-components-select/src/typings';
import { ArrowDownMIcon } from '@alfalab/icons-classic/ArrowDownMIcon';
import { ArrowDownSIcon } from '@alfalab/icons-classic/ArrowDownSIcon';

import styles from './index.module.css';
import { PickerButtonSize } from '..';

type FieldProps = Omit<BaseFieldProps, 'size' | 'hint' | 'success' | 'error' | 'placeholder'> &
    ButtonProps & {
        buttonSize?: PickerButtonSize;
    };

export const Field = ({
    buttonSize = 'm',
    view,
    label,
    open,
    multiple,
    rightAddons,
    Arrow,
    innerProps,
    className,
    selected,
    selectedMultiple,
    valueRenderer,
    ...restProps
}: FieldProps) => {
    const Icon: FC<SVGProps<SVGSVGElement>> = buttonSize === 'xs' ? ArrowDownSIcon : ArrowDownMIcon;

    const { ref, ...restInnerProps } = innerProps;

    const buttonProps = {
        ...restProps,
        ...restInnerProps,
    } as ButtonHTMLAttributes<HTMLButtonElement>;

    return (
        <div ref={ref}>
            <Button
                {...buttonProps}
                rightAddons={
                    <span className={cn(styles.iconContainer, open && styles.open)}>
                        <Icon data-test-id='picker-button-icon' />
                    </span>
                }
                block={true}
                view={view}
                size={buttonSize}
                className={cn(styles.component, view === 'primary' && styles.primary, className)}
            >
                {label}
            </Button>
        </div>
    );
};
