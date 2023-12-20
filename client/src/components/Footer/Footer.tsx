import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <div className={styles.FooterFlag}>
      <div className={styles.foo}>
        <div className={styles.copyRight}>
          © 2023 Copyright for X-partners
        </div>
      </div>
    </div>
  )
}