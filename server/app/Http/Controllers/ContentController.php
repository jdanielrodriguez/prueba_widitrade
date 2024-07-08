<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Content;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Validator;

class ContentController extends Controller
{
    public function index()
    {
        $contents = Content::with(['user', 'comments', 'favorites', 'ratings'])->get();
        $encript = new Encripter();

        $returnData = array(
            'status' => 200,
            'msg' => 'Contents Retrieved Successfully',
            'cripto' => $encript->encript(mb_convert_encoding(json_encode($contents), 'UTF-8', 'UTF-8')),
            'objeto' => null
        );

        return new Response($returnData, $returnData['status']);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'required|string',
            'content_type' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages()->toJson()
            ];
            return Response()->json($returnData, $returnData['status']);
        }

        $content = new Content();
        $content->user_id = Auth::id();
        $content->title = $request->title;
        $content->description = $request->description;
        $content->content = $request->content;
        $content->content_type = $request->content_type;
        $content->created_at = Carbon::now();
        $content->updated_at = Carbon::now();
        $content->save();

        $returnData = array(
            'status' => 201,
            'msg' => 'Content Created Successfully',
            'objeto' => $content
        );

        return new Response($returnData, $returnData['status']);
    }

    public function show($id)
    {
        $content = Content::with(['user', 'comments', 'favorites', 'ratings'])->find($id);
        if (!$content) {
            $returnData = array(
                'status' => 404,
                'msg' => 'No Record Found'
            );
            return new Response($returnData, $returnData['status']);
        }

        $returnData = array(
            'status' => 200,
            'msg' => 'Content Retrieved Successfully',
            'objeto' => $content
        );

        return new Response($returnData, $returnData['status']);
    }

    public function getBySlug($slug)
    {
        $encript = new Encripter();
        $id = $slug ? json_decode(mb_convert_encoding($encript->desencript($slug), 'UTF-8', 'UTF-8')) : null;
        if (!$encript->getValidSalt()) {
            $returnData = [
                'status' => 404,
                'objeto' => null,
                'msg' => "Error de seguridad"
            ];
            return Response::json($returnData, $returnData['status']);
        }
        $content = Content::whereRaw("slug = ?", $id)->with(['user', 'comments', 'favorites', 'ratings'])->first();
        if (!$content) {
            $returnData = array(
                'status' => 404,
                'msg' => 'No Record Found'
            );
            return new Response($returnData, $returnData['status']);
        }

        $returnData = array(
            'status' => 200,
            'msg' => 'Content Retrieved Successfully',
            'cripto' => $encript->encript(mb_convert_encoding(json_encode($content), 'UTF-8', 'UTF-8')),
            'objeto' => $content
        );

        return new Response($returnData, $returnData['status']);
    }

    public function update(Request $request, $id)
    {
        $content = Content::find($id);
        if (!$content) {
            $returnData = array(
                'status' => 404,
                'msg' => 'No Record Found'
            );
            return new Response($returnData, $returnData['status']);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'content' => 'sometimes|required|string',
            'content_type' => 'sometimes|required|string|max:50',
        ]);

        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages()->toJson()
            ];
            return Response()->json($returnData, $returnData['status']);
        }

        if ($request->has('title')) {
            $content->title = $request->title;
        }
        if ($request->has('description')) {
            $content->description = $request->description;
        }
        if ($request->has('content')) {
            $content->content = $request->content;
        }
        if ($request->has('content_type')) {
            $content->content_type = $request->content_type;
        }

        $content->updated_at = Carbon::now();
        $content->save();

        $returnData = array(
            'status' => 200,
            'msg' => 'Content Updated Successfully',
            'objeto' => $content
        );

        return new Response($returnData, $returnData['status']);
    }

    public function destroy($id)
    {
        $content = Content::find($id);
        if (!$content) {
            $returnData = array(
                'status' => 404,
                'msg' => 'No Record Found'
            );
            return new Response($returnData, $returnData['status']);
        }

        $content->delete();

        $returnData = array(
            'status' => 200,
            'msg' => 'Content Deleted Successfully'
        );

        return new Response($returnData, $returnData['status']);
    }
}
