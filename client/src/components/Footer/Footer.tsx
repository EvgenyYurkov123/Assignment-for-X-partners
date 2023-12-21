import styles from './Footer.module.css'

export default function Footer() {
  return (
    <div className={styles.FooterFlag}>
      <div className={styles.foo}>
        <div className={styles.copyRight}>
         <p> © 2023 Copyright for</p> 
         <a className={styles.footerLinkXPartners}>X-partners</a>
        </div>
      </div>
    </div>
  )
}