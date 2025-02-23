import {
  ApplicationCommandData,
  ApplicationCommandType,
  CacheType,
  ChatInputCommandInteraction,
  InteractionResponse,
} from "discord.js";
import { inject, injectable } from "tsyringe";

import { Client } from "../../core/Client";
import { Context, Interaction } from "../../core/Interaction";

import { HelpEmbed } from "../../embeds/HelpEmbed";

import { clientSymbol } from "../../utils/Constants";

import { helpersButtons } from "./About";

@injectable()
export default class Help extends Interaction {
  public readonly enabled = true;

  public readonly category = "General";

  public readonly command: ApplicationCommandData = {
    type: ApplicationCommandType.ChatInput,
    name: "help",
    description: "Displays all Lilith's commands.",
  };

  constructor(@inject(clientSymbol) private client: Client) {
    super();
  }

  public async run(
    interaction: ChatInputCommandInteraction<CacheType>,
    ctx: Context
  ): Promise<InteractionResponse<boolean>> {
    let commands = this.client.interactions;

    commands = commands.filter(
      (command) => command.enabled && interaction.memberPermissions.has(command.command.defaultMemberPermissions)
    );

    const embed = new HelpEmbed(commands, ctx);

    return await interaction.reply({ embeds: [embed], components: [helpersButtons] });
  }
}
