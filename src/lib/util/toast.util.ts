import { toast as sonner } from "svelte-sonner";

export function toast(message: App.Superforms.Message) {
	sonner[message.type](message.message ?? '');
}  
