<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Comment;
use App\Models\Favorite;
use App\Models\Rating;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Validator;

class ReactionsController extends Controller
{
    public function store(Request $request, $content_id)
    {
        $validator = Validator::make($request->all(), [
            'comment' => 'required|string',
        ]);

        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages()->toJson()
            ];
            return Response()->json($returnData, $returnData['status']);
        }

        $comment = new Comment();
        $comment->content_id = $content_id;
        $comment->user_id = Auth::id();
        $comment->comment = $request->comment;
        $comment->created_at = Carbon::now();
        $comment->updated_at = Carbon::now();
        $comment->save();

        $returnData = array(
            'status' => 201,
            'msg' => 'Comment added successfully',
            'data' => $comment
        );

        return new Response($returnData, $returnData['status']);
    }

    public function index($content_id)
    {
        $comments = Comment::where('content_id', $content_id)->get();

        $returnData = array(
            'status' => 200,
            'msg' => 'Comments Retrieved Successfully',
            'data' => $comments
        );

        return new Response($returnData, $returnData['status']);
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);
        if (!$comment) {
            $returnData = array(
                'status' => 404,
                'msg' => 'No Record Found'
            );
            return new Response($returnData, $returnData['status']);
        }

        $comment->delete();

        $returnData = array(
            'status' => 200,
            'msg' => 'Comment Deleted Successfully'
        );

        return new Response($returnData, $returnData['status']);
    }

    public function addFavorite($content_id)
    {
        $favorite = Favorite::firstOrCreate([
            'user_id' => Auth::id(),
            'content_id' => $content_id,
        ]);

        $returnData = array(
            'status' => 201,
            'msg' => 'Content added to favorites',
            'data' => $favorite
        );

        return new Response($returnData, $returnData['status']);
    }

    public function getFavorites()
    {
        $favorites = Favorite::where('user_id', Auth::id())->with('content')->get();

        $returnData = array(
            'status' => 200,
            'msg' => 'Favorites Retrieved Successfully',
            'data' => $favorites
        );

        return new Response($returnData, $returnData['status']);
    }

    public function addRating(Request $request, $content_id)
    {
        $validator = Validator::make($request->all(), [
            'rating' => 'required|numeric|min:1|max:5',
        ]);

        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages()->toJson()
            ];
            return Response()->json($returnData, $returnData['status']);
        }

        $rating = Rating::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'content_id' => $content_id,
            ],
            [
                'rating' => $request->rating,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        );

        $returnData = array(
            'status' => 201,
            'msg' => 'Rating added successfully',
            'data' => $rating
        );

        return new Response($returnData, $returnData['status']);
    }

    public function getRatings()
    {
        $ratings = Rating::where('user_id', Auth::id())->with('content')->get();

        $returnData = array(
            'status' => 200,
            'msg' => 'Ratings Retrieved Successfully',
            'data' => $ratings
        );

        return new Response($returnData, $returnData['status']);
    }
}
