import React, { MouseEventHandler, ReactNode, useContext } from 'react';
import classNames from 'classnames';
import ButtonGroup, { ButtonGroupProps } from 'choerodon-ui/lib/button/ButtonGroup';
import ConfigContext from 'choerodon-ui/lib/config-provider/ConfigContext';
import Dropdown, { DropDownProps } from './Dropdown';
import { ButtonProps } from '../button/Button';
import { ButtonType, FuncType } from '../button/interface';
import Button from '../button';
import { Placements } from './enum';
import { Size } from '../core/enum';

export interface DropdownButtonProps extends ButtonGroupProps, DropDownProps {
  type?: ButtonType;
  disabled?: boolean;
  icon?: ReactNode;
  size?: Size;
  funcType?: FuncType;
  onClick?: MouseEventHandler<any>;
  children?: any;
  buttonProps?: ButtonProps;
  buttonGroupPrefixCls?: string;
}

interface DropdownButtonInterface extends React.FC<DropdownButtonProps> {
  __PRO_DROPDOWN_BUTTON: boolean;
}

const DropdownButton: DropdownButtonInterface = function DropdownButton(props) {
  const {
    prefixCls: customizePrefixCls,
    type,
    disabled,
    icon,
    size,
    funcType,
    onClick,
    children,
    className,
    overlay,
    trigger,
    align,
    hidden,
    buttonProps,
    buttonGroupPrefixCls,
    placement,
    onHiddenChange,
    getPopupContainer,
    onOverlayClick,
    onHiddenBeforeChange,
    ...restProps
  } = props;
  const { getProPrefixCls } = useContext(ConfigContext);

  const prefixCls = getProPrefixCls('dropdown', customizePrefixCls);
  const dropdownProps: DropDownProps = {
    prefixCls,
    align,
    overlay,
    hidden,
    disabled: disabled || (buttonProps && buttonProps.loading),
    trigger: disabled ? [] : trigger,
    placement,
    onHiddenChange,
    onHiddenBeforeChange,
    getPopupContainer,
    onOverlayClick,
  };

  return (
    <ButtonGroup {...restProps} prefixCls={buttonGroupPrefixCls} className={classNames(`${prefixCls}-button`, className, {
      [`${prefixCls}-button-raised`]: !funcType || funcType === FuncType.raised,
      [`${prefixCls}-button-flat`]: funcType === FuncType.flat,
    })}>
      <Button {...buttonProps} funcType={FuncType.flat} size={size} type={type} disabled={disabled} onClick={onClick}>
        {children}
      </Button>
      <Dropdown {...dropdownProps}>
        {
          icon ?
            <Button funcType={FuncType.flat} size={size} disabled={dropdownProps.disabled}>{icon}</Button> :
            <Button funcType={FuncType.flat} size={size} disabled={dropdownProps.disabled} icon="arrow_drop_down" />
        }
      </Dropdown>
    </ButtonGroup>
  );
};

DropdownButton.__PRO_DROPDOWN_BUTTON = true;

DropdownButton.displayName = 'DropdownButton';

DropdownButton.defaultProps = {
  placement: Placements.bottomRight,
};

export default DropdownButton;
