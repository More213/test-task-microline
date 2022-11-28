
 export interface ConfigInterface {
  read: string[];
  write: string[];
}

const config: ConfigInterface = {
  read: ['sample@email.com', 'mark@fb.com', 'whoami@dot.com', 'test@email.com'],
  write: ['sample@email.com', 'test@email.com'],
};

const rightsСheck = (email: string): string => {
  const ruleRead = config.read.some((el: string) => el === email)
  const ruleWrite = config.write.some((el: string) => el === email)

  return `read rights: ${ruleRead},
  write rights: ${ruleWrite}`
}

rightsСheck('sample@email.com')