import React from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { BsEraserFill } from "react-icons/bs";
import { FaRotateRight } from "react-icons/fa6";
import { FaArrowCircleDown } from "react-icons/fa";
import { FaRotateLeft } from "react-icons/fa6";
import styles from "./index.module.css";
import cx from "classnames";
import { MENU_ITEMS } from "@/constant";
import { useDispatch, useSelector } from "react-redux";
import { menuItemClick, actionItemClick } from "../slice/menuSlice";

const Menu = () => {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const dispatch = useDispatch();

  const handleMenuClick = (item) => {
    dispatch(menuItemClick(item));
  };
  const handleActionItemClick = (item) => {
    dispatch(actionItemClick(item));
  };

  return (
    <div className={styles.menuContainer}>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL,
        })}
      >
        <BsFillPencilFill
          className={styles.icon}
          onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}
        />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.ERASER,
        })}
        onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}
      >
        <BsEraserFill className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.UNDO,
        })}
        onClick={() => handleActionItemClick(MENU_ITEMS.UNDO)}
      >
        <FaRotateLeft className={styles.icon} />
      </div>
      <div
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.UNDO,
        })}
        onClick={() => handleActionItemClick(MENU_ITEMS.REDO)}
      >
        <FaRotateRight className={styles.icon} />
      </div>
      <div
       className={cx(styles.iconWrapper, {
        [styles.active]: activeMenuItem === MENU_ITEMS.UNDO,
      })}
      onClick={() => handleActionItemClick(MENU_ITEMS.DOWNLOAD)}
      >
        <FaArrowCircleDown className={styles.icon} />
      </div>
    </div>
  );
};

export default Menu;
