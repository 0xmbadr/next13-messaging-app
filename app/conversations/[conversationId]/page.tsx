import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
import EmptyState from '@/app/components/EmptyState';

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversations = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversations) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">Conversation Id</div>
    </div>
  );
};

export default ConversationId;
