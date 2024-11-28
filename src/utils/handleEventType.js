export function handleEventType(eventType, close) {
  switch (eventType) {
    case "click":
    case "scroll":
      close();
      break;
    default:
      console.log(`Unknown event: ${eventType}`);
  }
}
