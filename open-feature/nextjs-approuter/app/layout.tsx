import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/index.scss'
import { createFlagsmithInstance } from 'flagsmith/isomorphic'
import { FlagsmithClientProvider } from '@openfeature/flagsmith-client-provider'
import { OpenFeature } from '@openfeature/web-sdk'

import Nav from '@/app/components/Nav'
import useDefaultUser from '@/app/hooks/useDefaultUser'
import FeatureFlagProvider from '@/app/components/FeatureFlagProvider'
import getTraits from "@/app/utils/getTraits";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flagsmith with Next.js',
  description: 'Generated by create next app',
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const defaultUser = useDefaultUser()
  const flagsmith = createFlagsmithInstance()
  await Promise.all([
      OpenFeature.clearContexts(),
      OpenFeature.clearProviders()
  ])
  if(defaultUser?.id){
      OpenFeature.setContext({
          targetingKey:defaultUser.id,
          traits:getTraits(defaultUser)!
      })
  }
  await OpenFeature.setProviderAndWait(
    new FlagsmithClientProvider({
      flagsmithInstance: flagsmith,
      environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
    }),
  )
  const serverState = flagsmith.getState()
  return (
    <html lang='en'>
      <FeatureFlagProvider serverState={serverState}>
        <body className={inter.className}>
          <Nav defaultUser={defaultUser} />
          {children}
        </body>
      </FeatureFlagProvider>
    </html>
  )
}
