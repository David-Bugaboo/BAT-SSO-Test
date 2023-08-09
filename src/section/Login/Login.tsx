import { useRouter } from 'next/router'
import { useCallback, useContext, useState } from 'react'
import FilledButton from '../../components/FilledButton'
import Input from '../../components/Input'
import { AuthContext } from '../../context/AuthContext'
import AppPaths from '../../core/appPaths'
import styles from './style.module.scss'
import Image from 'next/image'
import batLogo from './../../../public/bat_logo.png'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useContext(AuthContext)
  const router = useRouter();

  const handleLogin = useCallback(async () => {
    await signIn({ email, password }).then(() => router.push(AppPaths.dashboard))
  }, [email, password, router, signIn])
  
  return (
    <div className={styles.container}>
      <Image
            src={batLogo}
            alt="Picture of the author"
            width={393}
            height={184}
          />
      <h3 className={styles.title}>simulador de cura de tabaco Estufa BAT</h3>
      <Input name='email' placeholder='E-mail' type='text' value={email} onChangeFunction={setEmail} />
      <Input name='password' placeholder='Password' type='password' value={password} onChangeFunction={setPassword} />
      <FilledButton text='Login' onClickFunction={handleLogin} type="function" />
    </div>
  )
}

export default Login