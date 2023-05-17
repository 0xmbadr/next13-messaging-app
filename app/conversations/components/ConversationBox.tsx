import Avatar from '@/app/components/sidebar/Avatar';
import useOtherUser from '@/app/hooks/useOtherUser';
import { FullConversationType } from '@/app/types';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface ConverationBoxType {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConverationBoxType> = ({ data, selected }) => {
  const otherUser = useOtherUser(data);
  const router = useRouter();
  const session = useSession();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Set an Image';
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return 'Started a Conversations';
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100 dark:bg-black dark:hover:bg-neutral-900 rounded-lg transition cursor-pointer`,
        selected
          ? 'bg-neutral-100 dark:bg-neutral-900'
          : 'bg-white dark:bg-black',
      )}>
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-0">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md text-gray-900 dark:text-gray-100 font-medium truncate">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light dark:text-gray-300 pl-2">
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-sm`,
              hasSeen
                ? 'text-gray-500 dark:text-gray-400'
                : 'text-black dark:text-white font-medium',
            )}>
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
