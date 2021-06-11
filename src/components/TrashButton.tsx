import "./ToolIcon.scss";

import React, { useState } from "react";
import clsx from "clsx";
import { DeleteDialog } from "./DeleteDialog";
import { t } from "../i18n";

type ToolIconSize = "s" | "m";

type ToolButtonBaseProps = {
  icon?: React.ReactNode;
  "aria-label": string;
  "aria-keyshortcuts"?: string;
  "data-testid"?: string;
  label?: string;
  title?: string;
  name?: string;
  id?: string;
  size?: ToolIconSize;
  keyBindingLabel?: string;
  showAriaLabel?: boolean;
  hidden?: boolean;
  visible?: boolean;
  selected?: boolean;
  className?: string;
  clearReset: () => void;
};

type ToolButtonProps =
  | (ToolButtonBaseProps & {
      type: "button";
      children?: React.ReactNode;
      onClick?(): void;
    })
  | (ToolButtonBaseProps & {
      type: "icon";
      children?: React.ReactNode;
      onClick?(): void;
    })
  | (ToolButtonBaseProps & {
      type: "radio";
      checked: boolean;
      onChange?(): void;
    });

const DEFAULT_SIZE: ToolIconSize = "m";

export const TrashButton = React.forwardRef((props: ToolButtonProps, ref) => {
  const innerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => innerRef.current);

  const sizeCn = `ToolIcon_size_${props.size || DEFAULT_SIZE}`;
  const [modalIsShown, setModalIsShown] = useState(false);

  if (props.type === "button" || props.type === "icon") {
    if (modalIsShown) {
      return (
        <>
          <DeleteDialog
            message={t("alerts.clearReset")}
            onClose={() => setModalIsShown(false)}
            onConfirm={() => {
              props.clearReset();
              setModalIsShown(false);
            }}
          />
        </>
      );
    }
    return (
      <button
        className={clsx(
          "ToolIcon_type_button",
          sizeCn,
          props.className,
          props.visible && !props.hidden
            ? "ToolIcon_type_button--show"
            : "ToolIcon_type_button--hide",
          {
            ToolIcon: !props.hidden,
            "ToolIcon--selected": props.selected,
            "ToolIcon--plain": props.type === "icon",
          },
        )}
        data-testid={props["data-testid"]}
        hidden={props.hidden}
        title={props.title}
        aria-label={props["aria-label"]}
        type="button"
        onClick={() => setModalIsShown(true)}
        ref={innerRef}
      >
        {(props.icon || props.label) && (
          <div className="ToolIcon__icon" aria-hidden="true">
            {props.icon || props.label}
            {props.keyBindingLabel && (
              <span className="ToolIcon__keybinding">
                {props.keyBindingLabel}
              </span>
            )}
          </div>
        )}
        {props.showAriaLabel && (
          <div className="ToolIcon__label">{props["aria-label"]}</div>
        )}
        {props.children}
      </button>
    );
  }

  return null;
});

TrashButton.defaultProps = {
  visible: true,
  className: "",
};
