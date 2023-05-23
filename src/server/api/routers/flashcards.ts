import { z } from "zod";
import { Flashcard } from "@prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const flashcardsRouter = createTRPCRouter({


    createSet: protectedProcedure.input(z.object({
      title: z.string(),
    })).mutation(async ({ctx, input}) => {
      const authorId = ctx.session.user.id;

      const set = await ctx.prisma.set.create( {
        data:{
          authorId: authorId,
          title: input.title,
        }
      })
      return set;
    }),


    createFlashcards: protectedProcedure.input(z.object({
      flashcards: z.array(z.object({
        term: z.string(),
        definition: z.string(),
      })),
      setId: z.string(),
    })).mutation( async ({ctx,input }) => {
      const flashcards = input.flashcards;
      const setId = input.setId;
      for (let i =0; i<flashcards.length; i++) {
       const flashcard = flashcards[i];
       await ctx.prisma.flashcard.create({data: {
        term: flashcard?.term as string,
        definition: flashcard?.definition as string,
        setId: setId,


       }})
      }
      
    }),


    getFlashcardsById: publicProcedure.input(z.object({
      id: z.string()
    })).query(async ({ctx, input}) => {
      const flashcards = await ctx.prisma.set.findUnique({where: {
        id: input.id
      },
      include: {
        cards: true,
     
      }
    })
      return flashcards;
    }),

    getUserSets: publicProcedure.input(z.object({
      id: z.string()
    })).query(async ({ctx, input}) => {
      const userSets = await ctx.prisma.set.findMany({where: {
        authorId: input.id
      }})
      return userSets;
    })
});
