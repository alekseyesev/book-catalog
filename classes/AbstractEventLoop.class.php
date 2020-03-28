<?php

abstract class AbstractEventLoop
{
    private $timeout;
    private $get_response_output;
    public static function format_data($data, string $event_type = "message"): string
    {
        $stringified_data = gettype($data) === "string" ? $data : json_encode($data, JSON_UNESCAPED_UNICODE);
        return "event: {$event_type}" . "\n" . "data:" . $stringified_data .  "\n\n";
    }
    private function set_response_header()
    {
        return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) );
    }
    private function start()
    {
        return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) );
    }
    private function send_response()
    {
        return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) );
    }
    private function has_listeners(): bool
    {
        return new WP_Error( 'invalid-method', sprintf( __( "Method '%s' not implemented. Must be overridden in subclass." ), __METHOD__ ), array( 'status' => 405 ) );
    }
}
