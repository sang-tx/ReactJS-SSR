import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Home () {
  const { t } = useTranslation()
  return (
    <>
      <h2 className='flex'>{t('Home')}</h2>
    </>
  )
}
