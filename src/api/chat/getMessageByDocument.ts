import { appInstance } from '../instance';

type IParams = Prettify<{
  prompt: string;
  document_id: string;
}>;

export const getAiMessageByDocument = ({ prompt, document_id }: IParams) =>
  appInstance.post<string>('ai-process', {
    prompt,
    model: 'gpt-3.5-turbo',
    document_id,
  });
