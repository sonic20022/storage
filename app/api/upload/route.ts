import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;
  console.log('body', body);

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname: string, clientPayload?: string) => {
        return {
          allowedContentTypes: ["application/pdf"],
          maximumSizeInBytes: 30 * 1024 * 1024, // 30 MB
          metadata: JSON.stringify({
            // optional, sent to your server on upload completion
            user: "Ashraf Chowdury",
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // ⚠️ This will not work on `localhost` websites,
        console.log("blob upload completed", blob, tokenPayload);

        try {
          // Run any logic after the file upload completed,
        } catch (error) {
          throw new Error("Could not update post");
        }
      },
    });

    console.log("succeed", jsonResponse);
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 } // The webhook will retry 5 times waiting for a 200
    );
  }
}
