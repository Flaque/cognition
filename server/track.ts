// Data format similar to Segment's interface
interface Track {
  event?: string;
  messageId: string;
  properties?: object;
  replay?: boolean;
  timestamp: string;
  type: string;
  userId: string;
}

export default Track;
