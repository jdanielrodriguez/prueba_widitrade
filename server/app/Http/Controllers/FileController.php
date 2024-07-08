<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use App\Models\File;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Validator;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|mimes:jpg,jpeg,png,pdf,doc,docx,txt,json|max:2048',
        ]);

        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages()->toJson()
            ];
            return Response()->json($returnData, $returnData['status']);
        }

        $file = $request->file('file');
        $path = $file->store('files', 's3');

        $returnData = array(
            'status' => 201,
            'msg' => 'File Uploaded Successfully',
            'data' => [
                'path' => Storage::disk('s3')->url($path),
                'name' => $file->getClientOriginalName(),
                'type' => $file->getClientOriginalExtension(),
                'size' => $file->getSize(),
            ]
        );

        return new Response($returnData, $returnData['status']);
    }

    public function saveFile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'type' => 'required|string',
            'path' => 'required|string',
            'size' => 'required|integer',
            'landing_id' => 'nullable|exists:landings,id',
        ]);

        if ($validator->fails()) {
            $returnData = [
                'status' => 400,
                'msg' => 'Invalid Parameters',
                'validator' => $validator->messages()->toJson()
            ];
            return Response()->json($returnData, $returnData['status']);
        }

        $fileRecord = new File();
        $fileRecord->name = $request->name;
        $fileRecord->type = $request->type;
        $fileRecord->path = $request->path;
        $fileRecord->size = $request->size;
        $fileRecord->user_id = Auth::id();
        $fileRecord->landing_id = $request->landing_id;
        $fileRecord->created_at = Carbon::now();
        $fileRecord->updated_at = Carbon::now();
        $fileRecord->save();

        $returnData = array(
            'status' => 201,
            'msg' => 'File Information Saved Successfully',
            'data' => $fileRecord
        );

        return new Response($returnData, $returnData['status']);
    }

    public function index()
    {
        $files = File::all();

        $returnData = array(
            'status' => 200,
            'msg' => 'Files Retrieved Successfully',
            'data' => $files
        );

        return new Response($returnData, $returnData['status']);
    }

    public function show($id)
    {
        $file = File::find($id);
        if (!$file) {
            $returnData = array(
                'status' => 404,
                'msg' => 'No Record Found'
            );
            return new Response($returnData, $returnData['status']);
        }

        $returnData = array(
            'status' => 200,
            'msg' => 'File Retrieved Successfully',
            'data' => $file
        );

        return new Response($returnData, $returnData['status']);
    }

    public function destroy($id)
    {
        $file = File::find($id);
        if (!$file) {
            $returnData = array(
                'status' => 404,
                'msg' => 'No Record Found'
            );
            return new Response($returnData, $returnData['status']);
        }

        Storage::disk('s3')->delete(parse_url($file->path, PHP_URL_PATH));

        $file->delete();

        $returnData = array(
            'status' => 200,
            'msg' => 'File Deleted Successfully'
        );

        return new Response($returnData, $returnData['status']);
    }
}
